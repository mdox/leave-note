import { Request, Response } from "express";
import { sendInternalErrorOnFail } from "../lib/utils";
import NotesService from "../service/NotesService";

const NotesController = {
  async updateNote(req: Request, res: Response) {
    const noteId = parseInt(req.params.noteId);

    if (isNaN(noteId)) return res.status(400).send(null);

    const { title, content } = req.body;

    if (typeof title === "string") {
      if (title.length === 0) return res.status(400).send(null);
      if (title.length > 255) return res.status(400).send(null);
    }

    if (typeof content === "string") {
      if (content.length === 0) return res.status(400).send(null);
      if (content.length > 5000) return res.status(400).send(null);
    }

    await sendInternalErrorOnFail(res, async () => {
      const result = await NotesService.updateNote(noteId, { title, content });

      if (!result) {
        res.status(500).send(null);
        return;
      }

      res.status(200).json(result);
    });
  },

  async getNoteById(req: Request, res: Response) {
    const noteId = parseInt(req.params.noteId);

    if (isNaN(noteId)) return res.status(400).send(null);

    await sendInternalErrorOnFail(res, async () => {
      const result = await NotesService.getNoteById(noteId);

      if (!result) {
        res.status(404).send(null);
        return;
      }

      res.json(result);
    });
  },

  async getAllNotes(req: Request, res: Response) {
    await sendInternalErrorOnFail(res, async () => {
      const results = await NotesService.getAllNotes();

      res.json(results);
    });
  },

  async createNote(req: Request, res: Response) {
    const { title, content } = req.body;

    if (typeof title !== "string") return res.status(400).send(null);
    if (title.length === 0) return res.status(400).send(null);
    if (title.length > 255) return res.status(400).send(null);
    if (typeof content !== "string") return res.status(400).send(null);
    if (content.length === 0) return res.status(400).send(null);
    if (content.length > 5000) return res.status(400).send(null);

    await sendInternalErrorOnFail(res, async () => {
      const result = await NotesService.createNote({ title, content });

      if (!result) {
        res.status(500).send(null);
        return;
      }

      res.status(201).json(result);
    });
  },

  async deleteNote(req: Request, res: Response) {
    const noteId = parseInt(req.params.noteId);

    if (isNaN(noteId)) return res.status(400).send(null);

    await sendInternalErrorOnFail(res, async () => {
      const deletesCount = await NotesService.deleteNote(noteId);

      if (deletesCount !== 1) {
        res.status(500).send(null);
        return;
      }

      res.status(204).send(null);
    });
  },
};

export default NotesController;
