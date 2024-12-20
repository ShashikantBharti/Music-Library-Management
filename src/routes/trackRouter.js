import { Router } from "express";
import { addTrack } from "../controllers/trackController.js";

const router = Router();

router.route("/track").get(addTrack);

export default router;
