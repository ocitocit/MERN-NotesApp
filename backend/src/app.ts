import "dotenv/config";
import express from "express";
import NoteModel from "./models/note";

const app = express();

app.get("/", async (req, res) => {
  try {
    throw Error("terjadi error");
    const note = await NoteModel.find().exec();
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

export default app;
