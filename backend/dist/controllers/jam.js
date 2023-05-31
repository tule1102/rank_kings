"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJam = exports.updateJam = exports.createJam = exports.getJam = exports.getJams = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const jam_1 = __importDefault(require("../models/jam"));
const assertIsDefined_1 = require("../util/assertIsDefined");
const getJams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUserId = req.session.userId;
    console.log("authenticatedUserId is found: ", authenticatedUserId);
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        const jams = yield jam_1.default.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(jams);
    }
    catch (error) {
        next(error);
    }
});
exports.getJams = getJams;
const getJam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jamId = req.params.id;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(jamId)) {
            throw (0, http_errors_1.default)(400, "Invalid note id");
        }
        const jam = yield jam_1.default.findById(jamId).exec();
        if (!jam) {
            throw (0, http_errors_1.default)(404, "jam not found");
        }
        if (!jam.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this jam");
        }
        res.status(200).json(jam);
    }
    catch (error) {
        next(error);
    }
});
exports.getJam = getJam;
const createJam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const prelimSize = req.body.prelimSize;
    const todos = req.body.todos;
    const completedTodos = req.body.completedTodos;
    const battled = req.body.battled;
    const authenticatedUserId = req.session.userId;
    try {
        console.log("about to Authenticate the user", req.session.userId);
        console.log("about2 to Authenticate the user", req.session.id);
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        console.log("user was authenticated.");
        if (!title) {
            throw (0, http_errors_1.default)(400, "Jam must have a title");
        }
        const newJam = yield jam_1.default.create({
            userId: authenticatedUserId,
            title: title,
            todos: todos,
            completedTodos: completedTodos,
            battled: battled,
            prelimSize: prelimSize
        });
        console.log("jam.ts Line 82, it means the jam was created. ");
        res.status(201).json(newJam);
    }
    catch (error) {
        // console.error(error)
        next(error);
    }
});
exports.createJam = createJam;
// interface UpdateNoteBody {
//     title?: string,
//     text?: string,
// }
const updateJam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = req.body.todos;
    const completedTodos = req.body.completedTodos;
    const battled = req.body.battled;
    const authenticatedUserId = req.session.userId;
    // const jamKey = req.body.id;
    const id = req.body.id;
    console.log("Type of Id is ", typeof (id));
    // const jamKey = new mongoose.Types.ObjectId(id);
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, "Invalid Jam id");
        }
        const jam = yield jam_1.default.findById(id).exec();
        if (!jam) {
            throw (0, http_errors_1.default)(404, "jam not found");
        }
        console.log("Jam UserID: ", jam.userId);
        if (!jam.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this jam");
        }
        jam.todos = todos;
        jam.completedTodos = completedTodos;
        jam.battled = battled;
        const updatedJam = yield jam.save();
        res.status(200).json(updatedJam);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJam = updateJam;
const deleteJam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jamId = req.params.id;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(jamId)) {
            throw (0, http_errors_1.default)(400, "Invalid note id");
        }
        const jam = yield jam_1.default.findById(jamId).exec();
        if (!jam) {
            throw (0, http_errors_1.default)(404, "jam not found");
        }
        if (!jam.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You cannot access this jam");
        }
        yield jam.deleteOne();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJam = deleteJam;
