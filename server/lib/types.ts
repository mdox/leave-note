export type NotePostProps = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type NotePostCreateProps = Pick<NotePostProps, "title" | "content">;

export type NotePostUpdateProps = Partial<NotePostCreateProps>;
