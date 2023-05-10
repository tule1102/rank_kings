import { bool } from "envalid";
import { InferSchemaType, model, Schema } from "mongoose";

const listSchema = new Schema({
    todos: [{ id: Number, todo: String, isDone: Boolean }],
    completedTodos: [{ id: Number, todo: String, isDone: Boolean }],
    battled: [{ id: Number, todo: String, isDone: Boolean }],
    timestamp: { type: Date, default: Date.now }
});

type Jam = InferSchemaType<typeof listSchema>;

export default model<Jam>("List", listSchema);
