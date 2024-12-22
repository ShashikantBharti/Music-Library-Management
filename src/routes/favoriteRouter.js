import { Router } from "express";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";

const router = Router();

router.route("/favorites/add-favorite").post(addFavorite);
router.route("/favorites/:category").get(getFavorites);
router.route("/favorites/remove-favorite/:id").delete(deleteFavorite);

export default router;
