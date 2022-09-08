import db from "../db";
import {
  NotePostCreateProps,
  NotePostProps,
  NotePostUpdateProps,
} from "../lib/types";

const NotesDAO = {
  async createNote(data: NotePostCreateProps) {
    const results = await db("notes").insert(data, "*");
    const result = results[0];

    if (result) {
      return result as NotePostProps;
    }
  },

  async getAllNotes() {
    return (await db("notes")) as NotePostProps[];
  },

  async getFirstNote() {
    const result = await db("notes").first();

    if (result) {
      return result as NotePostProps;
    }
  },

  async getNoteById(id: number) {
    const results = await db("notes").where({ id });
    const result = results[0];

    if (result) {
      return result as NotePostProps;
    }
  },

  async updateNote(id: number, data: NotePostUpdateProps) {
    const results = await db("notes")
      .where({ id })
      .update({ ...data, updated_at: db.fn.now(6) })
      .returning("*");
    const result = results[0];

    if (result) {
      return results[0] as NotePostProps;
    }
  },
};

export default NotesDAO;
