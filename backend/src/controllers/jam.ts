import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import JamModel from "../models/jam";
import { assertIsDefined } from "../util/assertIsDefined";

export const getJams: RequestHandler = async (req, res, next) => {

    res.send("getJams works tu!")
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const jams = await JamModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(jams);
    } catch (error) {
        next(error);
    }
};

// export const getNote: RequestHandler = async (req, res, next) => {
//     const noteId = req.params.noteId;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(noteId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         const note = await NoteModel.findById(noteId).exec();

//         if (!note) {
//             throw createHttpError(404, "Note not found");
//         }

//         if (!note.userId.equals(authenticatedUserId)) {
//             throw createHttpError(401, "You cannot access this note");
//         }

//         res.status(200).json(note);
//     } catch (error) {
//         next(error);
//     }
// };

interface CreateJamBody {
    title?: string
}

export const createJam: RequestHandler<unknown, unknown, CreateJamBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "Jam must have a title");
        }

        const newJam = await JamModel.create({
            userId: authenticatedUserId,
            title: title
        });

        res.status(201).json(newJam);
    } catch (error) {
        next(error);
    }
};

// interface UpdateNoteParams {
//     noteId: string,
// }

// interface UpdateNoteBody {
//     title?: string,
//     text?: string,
// }

// export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
//     const noteId = req.params.noteId;
//     const newTitle = req.body.title;
//     const newText = req.body.text;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(noteId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         if (!newTitle) {
//             throw createHttpError(400, "Note must have a title");
//         }

//         const note = await NoteModel.findById(noteId).exec();

//         if (!note) {
//             throw createHttpError(404, "Note not found");
//         }

//         if (!note.userId.equals(authenticatedUserId)) {
//             throw createHttpError(401, "You cannot access this note");
//         }

//         note.title = newTitle;
//         note.text = newText;

//         const updatedNote = await note.save();

//         res.status(200).json(updatedNote);
//     } catch (error) {
//         next(error);
//     }
// };

// export const deleteNote: RequestHandler = async (req, res, next) => {
//     const noteId = req.params.noteId;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(noteId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         const note = await NoteModel.findById(noteId).exec();

//         if (!note) {
//             throw createHttpError(404, "Note not found");
//         }

//         if (!note.userId.equals(authenticatedUserId)) {
//             throw createHttpError(401, "You cannot access this note");
//         }

//         await note.remove();

//         res.sendStatus(204);
//     } catch (error) {
//         next(error);
//     }
// };