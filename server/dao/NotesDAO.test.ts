import NotesDAO from "./NotesDAO";

describe("NotesDAO", () => {
  it("createNote", async () => {
    const result = await NotesDAO.createNote({
      title: "Test",
      content: "Test Content...",
    });

    expect(result).toBeDefined();
  });

  it("deleteNote", async () => {
    const note = await NotesDAO.createNote({
      title: "For Delete",
      content: "For Delete",
    });

    expect(note).toBeDefined();

    if (!note) return;

    const deletesCount = await NotesDAO.deleteNote(note.id);

    expect(deletesCount).toBe(1);
  });

  it("getAllNotes", async () => {
    const results = await NotesDAO.getAllNotes();

    expect(results.length).toBeDefined();
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("getFirstNote", async () => {
    const result = await NotesDAO.getFirstNote();

    expect(result).toBeDefined();
  });

  it("getNoteById", async () => {
    const firstNote = await NotesDAO.getFirstNote();

    expect(firstNote).toBeDefined();

    if (!firstNote) return;

    const result = await NotesDAO.getNoteById(firstNote.id);

    expect(result).toBeDefined();
  });

  it("getNoteById must fail", async () => {
    const result = await NotesDAO.getNoteById(-1);

    expect(result).toBeUndefined();
  });

  it("updateNote", async () => {
    const noteBefore = await NotesDAO.getFirstNote();

    expect(noteBefore).toBeDefined();

    if (!noteBefore) return;

    const noteAfter = await NotesDAO.updateNote(noteBefore.id, {
      title: "Test - " + Date.now(),
      content: "Test Content - " + Date.now(),
    });

    expect(noteAfter).toBeDefined();

    if (!noteAfter) return;

    expect(noteAfter.title).not.toEqual(noteBefore.title);
    expect(noteAfter.content).not.toEqual(noteBefore.content);
    expect(noteAfter.created_at).toEqual(noteBefore.created_at);
    expect(noteAfter.updated_at).not.toEqual(noteBefore.updated_at);
  });

  it("updateNote must fail", async () => {
    const noteAfter = await NotesDAO.updateNote(-1, {
      title: "Test - " + Date.now(),
      content: "Test Content - " + Date.now(),
    });

    expect(noteAfter).toBeUndefined();
  });
});
