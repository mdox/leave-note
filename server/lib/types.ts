export type NotePostProps = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export type NotePostCreateProps = Pick<NotePostProps, "title" | "content">;

export type NotePostUpdateProps = Partial<NotePostCreateProps>;
