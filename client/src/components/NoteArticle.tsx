import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  NotePostCreateProps,
  NotePostProps,
  NotePostUpdateProps,
} from "../lib/server-lib/types";
import { useDefaultedState } from "../lib/useDefaultedState";
import { Field } from "./Field";
import { MessageBox } from "./MessageBox";
import { Show } from "./Show";

export interface NoteArticleProps extends NotePostProps {
  isEditing: boolean;
  isCreating: boolean;
  onSaved: () => void;
  onCancelled: () => void;
  onDeleted: () => void;
}

export function NoteArticle(props: NoteArticleProps) {
  // States
  const [
    stateTitle,
    setStateTitle,
    resetStateTitle,
    setDefaultStateTitle,
    refDefaultTitle,
  ] = useDefaultedState(props.title);
  const [
    stateContent,
    setStateContent,
    resetStateContent,
    setDefaultStateContent,
    refDefaultContent,
  ] = useDefaultedState(props.content);
  const [stateIsEditing, setStateIsEditing] = useState(props.isEditing);
  const [stateUpdatedAt, setStateUpdatedAt] = useState(props.updated_at);
  const [stateDisableAPIButtons, setStateDisableAPIButtons] = useState(false);
  const [stateErrorsModalIsShow, setStateErrorsModalIsShow] = useState(false);
  const [stateErrors, setStateErrors] = useState<string[]>([]);
  const [stateWarningModalIsShow, setStateWarningModalIsShow] = useState(false);
  const [stateWarningModalTitle, setStateWarningModalTitle] = useState("");
  const [stateWarningModalContent, setStateWarningModalContent] = useState("");
  const [stateDeleteModalIsShow, setStateDeleteModalIsShow] = useState(false);

  // Refs
  const refFrame = useRef<HTMLDivElement>(null);
  const refModalActionSubmit = useRef(() => {});

  // Memos
  const memoUpdatedAtFormattedText = useMemo(() => {
    const date = new Date(stateUpdatedAt);
    const timeText = date.toLocaleTimeString("hu");

    const dateText = date
      .toLocaleDateString("hu")
      .replaceAll(" ", "")
      .slice(0, -1)
      .replaceAll(".", "-");

    return [dateText, timeText].join(" ");
  }, [stateUpdatedAt]);

  // Methods
  function validate() {
    let errors: string[] = [];

    if (stateTitle.length === 0) errors.push("Title is too short.");
    if (stateTitle.length > 255) errors.push("Title is too long.");
    if (stateContent.length === 0) errors.push("Content is too short.");
    if (stateContent.length > 5000) errors.push("Content is too long.");

    return errors.length > 0 ? errors : true;
  }

  // Events
  async function onDelete() {
    setStateDisableAPIButtons(true);

    try {
      const response = await fetch("/api/note/" + props.id, {
        method: "DELETE",
      });

      if (response.ok) {
        setStateIsEditing(false);

        props.onDeleted();
      }
    } catch (e) {
      console.log(e);
    }

    setStateDisableAPIButtons(false);
  }

  function onCancel() {
    const cancel = () => {
      setStateIsEditing(false);
      setStateWarningModalIsShow(false);
      resetStateTitle();
      resetStateContent();
      props.onCancelled();
    };

    if (
      refDefaultTitle.current !== stateTitle ||
      refDefaultContent.current !== stateContent
    ) {
      refModalActionSubmit.current = cancel;
      setStateWarningModalTitle("Unsaved Cancel");
      setStateWarningModalContent(
        "Do you really want to cancel the procedure? Your changes are getting lost."
      );
      setStateWarningModalIsShow(true);
    } else {
      cancel();
    }
  }

  async function onSave() {
    const validationResult = validate();

    if (validationResult !== true) {
      setStateErrors(validationResult);
      setStateErrorsModalIsShow(true);
      return;
    }

    setStateDisableAPIButtons(true);

    try {
      if (props.isCreating) {
        const newData: NotePostCreateProps = {
          title: stateTitle,
          content: stateContent,
        };

        const response = await fetch("/api/note", {
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (response.ok) {
          props.onSaved();
        }
      } else {
        const newData: NotePostUpdateProps = {
          title: stateTitle,
          content: stateContent,
        };

        const response = await fetch("/api/note/" + props.id, {
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });

        if (response.ok) {
          const data: NotePostProps = await response.json();

          setDefaultStateTitle(data.title);
          setDefaultStateContent(data.content);

          setStateTitle(data.title);
          setStateContent(data.content);
          setStateUpdatedAt(data.updated_at);

          setStateIsEditing(false);

          props.onSaved();
        }
      }
    } catch (e) {
      console.log(e);
    }

    setStateDisableAPIButtons(false);
  }

  // Effects
  useEffect(() => {
    setStateTitle(props.title);
    setDefaultStateTitle(props.title);
  }, [props.title]);

  useEffect(() => {
    setStateContent(props.content);
    setDefaultStateContent(props.content);
  }, [props.content]);

  useEffect(() => {
    setStateIsEditing(props.isEditing);
  }, [props.isEditing]);

  useEffect(() => {
    setStateUpdatedAt(props.updated_at);
  }, [props.updated_at]);

  useEffect(() => {
    if (!stateIsEditing) return;
    if (!refFrame.current) return;

    refFrame.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [stateIsEditing]);

  // Renders
  return (
    <div
      ref={refFrame}
      className={clsx(
        "flex flex-col gap-2 p-2 bg-white rounded-lg shadow",
        stateIsEditing && "min-h-[calc(100vh-1rem)]"
      )}
    >
      <div className="flex items-center justify-between gap-2 p-2 bg-pink-100 rounded-t">
        <Field
          isEditing={stateIsEditing}
          view={() => <h3 className="text-xl">{stateTitle || "Untitled"}</h3>}
          edit={() => (
            <input
              type="text"
              value={stateTitle}
              className="grow"
              onChange={(e) => setStateTitle(e.currentTarget.value)}
            />
          )}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm shrink-0 text-neutral-600">
            {memoUpdatedAtFormattedText}
          </span>

          <Show when={!stateIsEditing}>
            <button
              type="button"
              className="button-warning"
              onClick={() => setStateIsEditing(true)}
            >
              Edit
            </button>
          </Show>
        </div>
      </div>
      {/* <div className="h-1 rounded bg-neutral-100"></div> */}
      <div className="p-2 rounded-b bg-fuchsia-100 grow flex flex-col">
        <Field
          isEditing={stateIsEditing}
          view={() => <p className="whitespace-pre-wrap">{stateContent}</p>}
          edit={() => (
            <textarea
              value={stateContent}
              className="w-full grow resize-none"
              onChange={(e) => setStateContent(e.currentTarget.value)}
            ></textarea>
          )}
        />
      </div>
      <Show when={stateIsEditing}>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Show when={!props.isCreating}>
              <button
                type="button"
                disabled={stateDisableAPIButtons}
                className="button-danger"
                onClick={() => setStateDeleteModalIsShow(true)}
              >
                Delete
              </button>
            </Show>
          </div>

          <div className="flex gap-2">
            <button type="button" className="button" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={stateDisableAPIButtons}
              className="button-submit"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </Show>

      <Show when={stateDeleteModalIsShow}>
        <MessageBox
          type="Danger"
          title="Delete"
          actions={["Submit"]}
          onAction={() => onDelete()}
          onClose={() => setStateDeleteModalIsShow(false)}
        >
          <p className="whitespace-pre-wrap">
            {`This process is removing the note completely.\nPress 'Submit' to continue the deletion process.`}
          </p>
        </MessageBox>
      </Show>

      <Show when={stateWarningModalIsShow}>
        <MessageBox
          type="Warning"
          title={stateWarningModalTitle}
          actions={["OK"]}
          onAction={() => refModalActionSubmit.current()}
          onClose={() => setStateWarningModalIsShow(false)}
        >
          <p>{stateWarningModalContent}</p>
        </MessageBox>
      </Show>

      <Show when={stateErrorsModalIsShow}>
        <MessageBox
          type="Danger"
          title="Errors"
          actions={[]}
          onAction={() => setStateErrorsModalIsShow(false)}
          onClose={() => setStateErrorsModalIsShow(false)}
        >
          {stateErrors.map((error) => (
            <p key={error}>❌ {error}</p>
          ))}
        </MessageBox>
      </Show>
    </div>
  );
}
