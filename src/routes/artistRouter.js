import { Router } from "express";
import {
  addArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artistController.js";

const router = Router();

router.route("/artist").get(getArtists);
router.route("/artist/:id").get(getArtist);
router.route("/artist/add-artist").post(addArtist);
router.route("/artist:id").put(updateArtist);
router.route("/artist:id").delete(deleteArtist);

export default router;
