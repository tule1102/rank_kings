import express from "express";
import * as JamController from "../controllers/jam";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, JamController.getJams);

router.post("/", JamController.createJam);

// router.post("/login", UserController.login);

// router.post("/logout", UserController.logout);

export default router;