import { Router } from "express";
import { addUser } from "../controllers/userController.js";

const router = Router();

router.route("/").get(addUser);

export default router;
