import { NoteArticleList } from "../components/NoteArticleList";

export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="p-2 shadow bg-green-100 flex justify-between gap-2">
        <h2 className="text-2xl">Leave Notes</h2>
      </div>

      <NoteArticleList />
    </div>
  );
}
