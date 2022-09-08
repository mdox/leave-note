import { useMemo } from "react";
import { NotePostProps } from "../lib/server-lib/types";

export interface NoteArticleProps extends NotePostProps {}

export function NoteArticle(props: NoteArticleProps) {
  // Memos
  const memoUpdatedAtFormattedText = useMemo(() => {
    return props.updated_at.toISOString().split(".")[0].split("T").join(" ");
  }, [props.updated_at]);

  // Renders
  return (
    <div className="flex flex-col rounded-lg bg-white shadow p-2 gap-1">
      <div className="flex items-center justify-between p-2 rounded-t bg-pink-100">
        <h3 className="text-xl">{props.title}</h3>
        <span className="text-sm text-neutral-600">
          {memoUpdatedAtFormattedText}
        </span>
      </div>
      {/* <div className="bg-neutral-100 h-1 rounded"></div> */}
      <div className="p-2 rounded-b bg-fuchsia-100">
        <p className="whitespace-pre-wrap">{props.content}</p>
      </div>
    </div>
  );
}
