import { useEffect, useMemo, useState } from "react";
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
    const response = await fetch("/api/note/" + props.id, {
      method: "DELETE",
    });

    if (response.ok) {
      setStateIsEditing(false);

      props.onDeleted();
    }
  }

  function onCancel() {
    setStateIsEditing(false);
    resetStateTitle();
    resetStateContent();
    props.onCancelled();
  }

  async function onSave() {
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

  // Renders
  return (
    <div className="flex flex-col rounded-lg bg-white shadow p-2 gap-2">
      <div className="flex items-center justify-between p-2 rounded-t bg-pink-100 gap-2">
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
          <span className="shrink-0 text-sm text-neutral-600">
            {memoUpdatedAtFormattedText}
          </span>

          <Show when={!stateIsEditing}>
            <button
              type="button"
              className="bg-yellow-500 text-stone-50 rounded shadow py-1 px-3"
              onClick={() => setStateIsEditing(true)}
            >
              Edit
            </button>
          </Show>
        </div>
      </div>
      {/* <div className="bg-neutral-100 h-1 rounded"></div> */}
      <div className="p-2 rounded-b bg-fuchsia-100">
        <Show when={stateIsEditing}>
          <textarea
            value={stateContent}
            className="w-full"
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
                className="bg-red-500 text-stone-50 rounded shadow py-1 px-3"
                onClick={onDelete}
              >
                Delete
              </button>
            </Show>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="bg-neutral-500 text-stone-50 rounded shadow py-1 px-3"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-stone-50 rounded shadow py-1 px-3"
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
