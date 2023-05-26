"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jamSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    prelimSize: { type: Number, required: true },
    // userId: { type: Schema.Types.ObjectId, ref: "User" ,required: true, select: false },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    // userId: {type: String},
    todos: [{ id: Number, todo: String, isDone: Boolean }],
    completedTodos: [{ id: Number, todo: String, isDone: Boolean }],
    battled: [{ id: Number, todo: String, isDone: Boolean }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Jam", jamSchema);
