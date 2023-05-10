import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import JamModel from "../models/jam";
import { assertIsDefined } from "../util/assertIsDefined";


export const getJams: RequestHandler = async (req, res, next) => {

    const authenticatedUserId = req.session.userId;
    
    try {
        assertIsDefined(authenticatedUserId);
        const jams = await JamModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(jams);
    } catch (error) {
        next(error);
    }
};

export const getJam: RequestHandler = async (req, res, next) => {

    const jamId = req.params.id;
    const authenticatedUserId = req.session.userId;

    try {

        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(jamId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const jam = await JamModel.findById(jamId).exec();

        if (!jam) {
            throw createHttpError(404, "jam not found");
        }

        if (!jam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this jam");
        }

        res.status(200).json(jam);
    } catch (error) {
        next(error);
    }
};

interface CreateJamBody {
    title: string,
    todos: Array<any>,
    completedTodos: Array<any>,
    battled: Array<any> 
}

export const createJam: RequestHandler<unknown, unknown, CreateJamBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const todos = req.body.todos;
    const completedTodos = req.body.completedTodos;
    const battled = req.body.battled;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "Jam must have a title");
        }

        const newJam = await JamModel.create({
            userId: authenticatedUserId,
            title: title,
            todos: todos,
            completedTodos: completedTodos,
            battled: battled,
        });

        res.status(201).json(newJam);
    } catch (error) {
        // console.error(error)
        next(error);
    }
};

interface UpdateNoteParams {
    id: string;
    todos: Array<any>,
    completedTodos: Array<any>,
    battled: Array<any>
    authticatedUserId: any
}

// interface UpdateNoteBody {
//     title?: string,
//     text?: string,
// }

export const updateJam: RequestHandler<UpdateNoteParams> = async (req, res, next) => {
    const todos = req.body.todos;
    const completedTodos = req.body.completedTodos;
    const battled = req.body.battled;
    const authenticatedUserId = req.session.userId;
    // const jamKey = req.body.id;
    const id = req.body.id

    console.log("Type of Id is ", typeof(id))
    // const jamKey = new mongoose.Types.ObjectId(id);


    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Jam id");
        }

        const jam = await JamModel.findById(id).exec();

        if (!jam) {
            throw createHttpError(404, "jam not found");
        }

        console.log("Jam UserID: ", jam.userId)

        if (!jam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this jam");
        }

        jam.todos = todos;
        jam.completedTodos = completedTodos;
        jam.battled = battled;

        const updatedJam = await jam.save();
        res.status(200).json(updatedJam);
    } catch (error) {
        next(error);
    }
};

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