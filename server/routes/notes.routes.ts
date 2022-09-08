import { Router } from "express";
import NotesController from "../controller/NotesController";

const notesRouter = Router();

notesRouter.get("/notes", NotesController.getAllNotes);
notesRouter.get("/note/:noteId", NotesController.getNoteById);
notesRouter.put("/note/:noteId", NotesController.updateNote);
notesRouter.post("/note", NotesController.createNote);

export default notesRouter;
