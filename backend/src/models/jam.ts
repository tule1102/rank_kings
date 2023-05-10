import { InferSchemaType, model, Schema } from "mongoose";

const jamSchema = new Schema({
    title: { type: String, required: true, unique: true },
    // userId: { type: Schema.Types.ObjectId, ref: "User" ,required: true, select: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" ,required: true },
    // userId: {type: String},
    todos: [{ id: Number, todo: String, isDone: Boolean }],
    completedTodos: [{ id: Number, todo: String, isDone: Boolean }],
    battled: [{ id: Number, todo: String, isDone: Boolean }]},
    {timestamps: true});

type Jam = InferSchemaType<typeof jamSchema>;

export default model<Jam>("Jam", jamSchema);
