import { NoteArticle } from "./NoteArticle";

export interface NoteArticleListProps {}

export function NoteArticleList(props: NoteArticleListProps) {
  return (
    <>
      <NoteArticle
        id={0}
        title="Dummy Title"
        content="Dummy Content..."
        created_at={new Date()}
        updated_at={new Date()}
      />
    </>
  );
}
