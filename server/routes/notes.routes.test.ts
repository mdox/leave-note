import supertest from "supertest";
import app from "../app";
import {
  NotePostCreateProps,
  NotePostProps,
  NotePostUpdateProps,
} from "../lib/types";
import NotesService from "../service/NotesService";

describe("notes.routes", () => {
  it("POST /note", async () => {
    const newNotePostCreateData: NotePostCreateProps = {
      title: "Route Test",
      content: "Route Test",
    };

    const result = await supertest(app)
      .post("/note")
      .send(newNotePostCreateData);

    expect(result.statusCode).toBe(201);

    const newNotePostData = result.body as NotePostProps;

    expect(newNotePostData).toBeDefined();

    if (!newNotePostData) return;

    expect(newNotePostData.title).toBe(newNotePostCreateData.title);
    expect(newNotePostData.content).toBe(newNotePostCreateData.content);
  });

  it("PUT /note/:noteId", async () => {
    const subjectNotePostData = await NotesService.getFirstNote();

    expect(subjectNotePostData).toBeDefined();

    if (!subjectNotePostData) return;

    const newNotePostUpdateData: NotePostUpdateProps = {
      title: "Route Test " + Date.now(),
      content: "Route Test " + Date.now(),
    };

    const result = await supertest(app)
      .put(`/note/${subjectNotePostData.id}`)
      .send(newNotePostUpdateData);

    expect(result.statusCode).toBe(201);

    const updatedNotePostData = result.body as NotePostProps;

    expect(updatedNotePostData).toBeDefined();

    if (!updatedNotePostData) return;

    expect(updatedNotePostData.title).toBe(newNotePostUpdateData.title);
    expect(updatedNotePostData.content).toBe(newNotePostUpdateData.content);
  });

  it("GET /note/:noteId", async () => {
    const subjectNotePostData = await NotesService.getFirstNote();

    expect(subjectNotePostData).toBeDefined();

    if (!subjectNotePostData) return;

    const result = await supertest(app).get(`/note/${subjectNotePostData.id}`);

    expect(result.statusCode).toBe(200);

    const receivedNotePostData = result.body as NotePostProps;

    expect(receivedNotePostData).toBeDefined();

    if (!receivedNotePostData) return;

    expect(receivedNotePostData.title).toBe(subjectNotePostData.title);
    expect(receivedNotePostData.content).toBe(subjectNotePostData.content);
  });

  it("GET /notes", async () => {
    const result = await supertest(app).get("/notes");

    expect(result.statusCode).toBe(200);

    const posts: NotePostProps[] = result.body;

    expect(posts).toBeDefined();

    if (!posts) return;

    expect(posts.length).toBeGreaterThanOrEqual(1);
  });
});
