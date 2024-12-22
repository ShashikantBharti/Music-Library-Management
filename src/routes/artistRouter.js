import { Router } from "express";
import {
  addArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artistController.js";

const router = Router();

router.route("/artists").get(getArtists);
router.route("/artists/:id").get(getArtist);
router.route("/artists/add-artist").post(addArtist);
router.route("/artists/:id").put(updateArtist);
router.route("/artists/:id").delete(deleteArtist);

export default router;
