import db from "../db";

const NotesDAO = {
  async createNote(data: { title: string; content: string }) {
    const results = await db("notes").insert(data, "*");
    return results[0];
  },

  async getAllNotes() {
    return await db("notes");
  },

  async getNoteById(id: number) {
    const results = await db("notes").where({ id });
    return results[0];
  },

  async updateNote(id: number, data: { title?: string; content?: string }) {
    const results = await db("notes").where({ id }).update(data).returning("*");
    return results[0];
  },
};

export default NotesDAO;
