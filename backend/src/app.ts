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

// const corsOptions = {
//     origin: "https://rank-kings-be.onrender.com", // Replace with your allowed origin
//   };

// app.use(cors());
// app.use(cors({
//     origin: 'https://rank-kings-fe.onrender.com',
//     credentials: true
//   }));


app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

// app.use(cors({
//     origin: 'https://rank-kings-fe.onrender.com',
//     methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//     credentials: true
//   }));


app.use("/users", userRoutes);
app.use("/jams", requiresAuth, jamRoutes);
// app.use("/jams", jamRoutes);

// const corsOptions = {
//     origin: "https://rank-kings-fe.onrender.com"
//   };
  
// app.use(cors(corsOptions));

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