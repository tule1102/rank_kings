import { ObjectId } from "mongodb";

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

export interface Jam {
    _id: string;
    title: string;
    userId: string;
}

export interface User {
    username: string,
    email: string,
    userId: ObjectId
}