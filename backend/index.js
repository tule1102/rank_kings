import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import env from "./util/validateEnv.mjs"
const app = express();

app.get("/", (req, res) => {
    res.send("Hello Worlds")
})

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port)
        });

    })
    .catch(console.error);

 

