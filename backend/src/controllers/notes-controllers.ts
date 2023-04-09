import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const note = await NoteModel.find().exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
