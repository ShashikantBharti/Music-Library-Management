import { Router } from "express";
import { addArtist } from "../controllers/artistController.js";

const router = Router();

router.route("/").get(addArtist);

export default router;
