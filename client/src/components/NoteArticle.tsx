import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  NotePostCreateProps,
  NotePostProps,
  NotePostUpdateProps,
} from "../lib/server-lib/types";
import { useDefaultedState } from "../lib/useDefaultedState";
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
  const [stateTitle, setStateTitle, resetStateTitle, setDefaultStateTitle] =
    useDefaultedState(props.title);
  const [
    stateContent,
    setStateContent,
    resetStateContent,
    setDefaultStateContent,
  ] = useDefaultedState(props.content);
  const [stateIsEditing, setStateIsEditing] = useState(props.isEditing);
  const [stateUpdatedAt, setStateUpdatedAt] = useState(props.updated_at);
  const [stateDisableAPIButtons, setStateDisableAPIButtons] = useState(false);

  // Refs
  const refFrame = useRef<HTMLDivElement>(null);

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
    setStateIsEditing(false);
    resetStateTitle();
    resetStateContent();
    props.onCancelled();
  }

  async function onSave() {
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
        <Show when={stateIsEditing}>
          <input
            type="text"
            value={stateTitle}
            className="grow"
            onChange={(e) => setStateTitle(e.currentTarget.value)}
          />
        </Show>
        <Show when={!stateIsEditing}>
          <h3 className="text-xl">{stateTitle || "Untitled"}</h3>
        </Show>
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
        <Show when={stateIsEditing}>
          <textarea
            value={stateContent}
            className="w-full grow resize-none"
            onChange={(e) => setStateContent(e.currentTarget.value)}
          ></textarea>
        </Show>
        <Show when={!stateIsEditing}>
          <p className="whitespace-pre-wrap">{stateContent}</p>
        </Show>
      </div>
      <Show when={stateIsEditing}>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Show when={!props.isCreating}>
              <button
                type="button"
                disabled={stateDisableAPIButtons}
                className="button-danger"
                onClick={onDelete}
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
    </div>
  );
}
