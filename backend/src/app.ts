import "dotenv/config";
import env from "./util/validateEnv"
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
// import notesRoutes from "./routes/notes";
import userRoutes from "./routes/user";
import jamRoutes from "./routes/jams";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

  

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: false
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/jams", jamRoutes);

// app.use("/jams", requiresAuth, jamRoutes);


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;