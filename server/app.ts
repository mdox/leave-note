import bodyParser from "body-parser";
import express from "express";
import notesRouter from "./routes/notes.routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(notesRouter);

export default app;
