import { Router } from "express";
import { addFavorite } from "../controllers/favoriteController.js";

const router = Router();

router.route("/").get(addFavorite);

export default router;
