import { Router } from "express";
import { addTrack } from "../controllers/trackController.js";

const router = Router();

router.route("/").get(addTrack);

export default router;
