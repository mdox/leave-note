import { useMemo } from "react";
import useSWR from "swr";
import { CreateNote } from "../components/CreateNote";
import { NoteArticleList } from "../components/NoteArticleList";
import { NotePostProps } from "../lib/server-lib/types";

export interface HomeProps {}

export function Home(props: HomeProps) {
  // SWR
  const { data: items, mutate: mutateItems } = useSWR<NotePostProps[]>(
    "/api/notes",
    (url) => fetch(url).then((res) => res.json())
  );

  // Memos
  const memoItems = useMemo(() => {
    return items
      ? items.sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1))
      : [];
  }, [items]);

  // Events
  async function onDeleted() {
    await mutateItems();
  }

  async function onCreated() {
    await mutateItems();
  }

  // Renders
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="p-2 shadow bg-emerald-200 flex items-center justify-between gap-2">
        <h2 className="text-2xl text-emerald-800">
          <span>
            L<span className="text-emerald-600">eave</span>
          </span>
          <span>
            N<span className="text-emerald-600">otes</span>
          </span>
        </h2>
      </div>

      <CreateNote onCreated={onCreated} />

      <NoteArticleList items={items ?? []} onDeleted={onDeleted} />
    </div>
  );
}
