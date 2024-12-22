import { Router } from "express";
import {
  addArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artistController.js";
import { isEditorOrAdmin, verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/artists").get(getArtists);
router.route("/artists/:id").get(getArtist);
router.route("/artists/add-artist").post(verifyJWT, isEditorOrAdmin, addArtist);
router.route("/artists/:id").put(verifyJWT, isEditorOrAdmin, updateArtist);
router.route("/artists/:id").delete(verifyJWT, isEditorOrAdmin, deleteArtist);

export default router;
