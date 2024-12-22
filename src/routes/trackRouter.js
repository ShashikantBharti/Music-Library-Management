import { Router } from "express";
import {
  addTrack,
  deleteTrack,
  getTrack,
  getTracks,
  updateTrack,
} from "../controllers/trackController.js";

const router = Router();

router.route("/tracks").get(getTracks);
router.route("/tracks/:id").get(getTrack);
router.route("/tracks/add-track").post(addTrack);
router.route("/tracks/:id").put(updateTrack);
router.route("/tracks/:id").delete(deleteTrack);

export default router;
