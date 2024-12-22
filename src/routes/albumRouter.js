import { Router } from "express";
import {
  addAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from "../controllers/albumController.js";

const router = Router();

router.route("/albums").get(getAlbums);
router.route("/albums/:id").get(getAlbum);
router.route("/albums/add-album").post(addAlbum);
router.route("/albums/:id").put(updateAlbum);
router.route("/albums/:id").delete(deleteAlbum);

export default router;
