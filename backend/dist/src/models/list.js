"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    todos: [{ id: Number, todo: String, isDone: Boolean }],
    completedTodos: [{ id: Number, todo: String, isDone: Boolean }],
    battled: [{ id: Number, todo: String, isDone: Boolean }],
    timestamp: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)("List", listSchema);
