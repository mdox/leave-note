import { NotePostProps } from "../lib/server-lib/types";
import { NoteArticle } from "./NoteArticle";

export interface NoteArticleListProps {
  items: NotePostProps[];
  onDeleted: () => void;
}

export function NoteArticleList(props: NoteArticleListProps) {
  return (
    <div className="flex flex-col gap-2">
      {props.items.map((item) => (
        <NoteArticle
          key={item.id}
          {...item}
          isEditing={false}
          isCreating={false}
          onSaved={() => {}}
          onCancelled={() => {}}
          onDeleted={props.onDeleted}
        />
      ))}
    </div>
  );
}
