import { InferSchemaType, model, Schema } from "mongoose";

const jamSchema = new Schema({
    title: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" ,required: true, select: false },
}, {timestamps: true});

type Jam = InferSchemaType<typeof jamSchema>;

export default model<Jam>("Jam", jamSchema);
