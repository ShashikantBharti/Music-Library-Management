import { Router } from "express";
import { addAlbum } from "../controllers/albumController.js";

const router = Router();

router.route("/album").get(addAlbum);

export default router;
