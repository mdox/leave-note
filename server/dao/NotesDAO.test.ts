import NotesDAO from "./NotesDAO";

describe("NotesDAO", () => {
  it("createNote", async () => {
    const results = await NotesDAO.createNote({
      title: "Test",
      content: "Test Content...",
    });

    expect(results).toBeDefined();
  });

  it("getAllNotes", async () => {
    const results = await NotesDAO.getAllNotes();

    expect(results.length).toBeDefined();
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("getNoteById", async () => {
    const result = await NotesDAO.getNoteById(1);

    expect(result).toBeDefined();
  });

  it("getNoteById must fail", async () => {
    const result = await NotesDAO.getNoteById(-1);

    expect(result).toBeUndefined();
  });

  it("updateNote", async () => {
    const noteBefore = await NotesDAO.getNoteById(1);

    expect(noteBefore).toBeDefined();

    const noteAfter = await NotesDAO.updateNote(1, {
      title: "Test - " + Date.now(),
      content: "Test Content - " + Date.now(),
    });

    expect(noteAfter).toBeDefined();
    expect(noteAfter.title === noteBefore.title).toBeFalsy();
    expect(noteAfter.content === noteBefore.content).toBeFalsy();
  });

  it("updateNote must fail", async () => {
    const noteAfter = await NotesDAO.updateNote(-1, {
      title: "Test - " + Date.now(),
      content: "Test Content - " + Date.now(),
    });

    expect(noteAfter).toBeUndefined();
  });
});
