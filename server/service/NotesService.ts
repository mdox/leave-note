import NotesDAO from "../dao/NotesDAO";
import { NotePostCreateProps, NotePostUpdateProps } from "../lib/types";

const NotesService = {
  async createNote(data: NotePostCreateProps) {
    return await NotesDAO.createNote(data);
  },

  async getAllNotes() {
    return await NotesDAO.getAllNotes();
  },

  async getFirstNote() {
    return await NotesDAO.getFirstNote();
  },

  async getNoteById(id: number) {
    return await NotesDAO.getNoteById(id);
  },

  async updateNote(id: number, data: NotePostUpdateProps) {
    return await NotesDAO.updateNote(id, data);
  },
};

export default NotesService;
