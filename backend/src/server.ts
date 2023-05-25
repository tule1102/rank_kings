import app from "./app"
import "dotenv/config";
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import env from "./util/validateEnv"
import path from "path";

const port = env.PORT;

// app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// app.get('*', (_req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port)
        });

    })
    .catch(console.error);

 

