import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  login,
  logout,
  signup,
  updatePassword,
} from "../controllers/userController.js";

const router = Router();

router.route("/logout").get(logout);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/users").get(getUsers);
router.route("/users/add-user").post(addUser);
router.route("/users/:id").delete(deleteUser);
router.route("/users/update-password").put(updatePassword);

export default router;
