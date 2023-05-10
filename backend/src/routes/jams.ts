import express from "express";
import * as JamController from "../controllers/jam";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, JamController.getJams);

router.post("/", JamController.createJam);

router.put("/updateJam", JamController.updateJam);

router.get("/:id", JamController.getJam);

export default router;