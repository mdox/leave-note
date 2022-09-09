import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { NoteArticle } from "./NoteArticle";
import { Show } from "./Show";

export interface CreateNoteProps {
  onCreated: () => void;
}

export function CreateNote(props: CreateNoteProps) {
  // States
  const [stateIsCreatingNewNote, setStateIsCreatingNewNote] = useState(false);

  // Events
  function onSaved() {
    setStateIsCreatingNewNote(false);
    props.onCreated();
  }

  // Renders
  return (
    <>
      <Show when={!stateIsCreatingNewNote}>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-3 py-1 bg-blue-500 text-stone-50 rounded shadow flex items-center justify-center gap-2"
            onClick={() => setStateIsCreatingNewNote(true)}
          >
            <PlusIcon width={24} height={24} />
            <span>New Note</span>
          </button>
        </div>
      </Show>

      <Show when={stateIsCreatingNewNote}>
        <NoteArticle
          id={0}
          title=""
          content=""
          created_at={new Date().toISOString()}
          updated_at={new Date().toISOString()}
          isEditing={true}
          isCreating={true}
          onCancelled={() => setStateIsCreatingNewNote(false)}
          onSaved={onSaved}
        />
      </Show>
    </>
  );
}
