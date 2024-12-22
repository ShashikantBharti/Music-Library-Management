import { Router } from "express";
import {
  addTrack,
  deleteTrack,
  getTrack,
  getTracks,
  updateTrack,
} from "../controllers/trackController.js";
import { isEditorOrAdmin, verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/tracks").get(getTracks);
router.route("/tracks/:id").get(getTrack);
router.route("/tracks/add-track").post(verifyJWT, isEditorOrAdmin, addTrack);
router.route("/tracks/:id").put(verifyJWT, isEditorOrAdmin, updateTrack);
router.route("/tracks/:id").delete(verifyJWT, isEditorOrAdmin, deleteTrack);

export default router;
