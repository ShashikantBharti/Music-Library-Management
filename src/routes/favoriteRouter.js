import { Router } from "express";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";
import { isEditorOrAdmin, verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/favorites/add-favorite")
  .post(verifyJWT, isEditorOrAdmin, addFavorite);
router
  .route("/favorites/:category")
  .get(verifyJWT, isEditorOrAdmin, getFavorites);
router
  .route("/favorites/remove-favorite/:id")
  .delete(verifyJWT, isEditorOrAdmin, deleteFavorite);

export default router;
