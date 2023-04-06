import "dotenv/config";
import express from "express";
import NoteModel from "./models/note";

const app = express();

app.get("/", async (req, res) => {
  const note = await NoteModel.find().exec();
  res.status(200).json(note);
});

export default app;
