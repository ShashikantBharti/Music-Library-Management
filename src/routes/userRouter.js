import { Router } from "express";
import {
  addSuperAdmin,
  addUser,
  deleteUser,
  getUsers,
  login,
  logout,
  signup,
  updatePassword,
} from "../controllers/userController.js";
import { verifyAdmin, verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/add-super-admin").post(addSuperAdmin);
router.route("/logout").get(logout);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/users").get(verifyJWT, getUsers);
router.route("/users/add-user").post(verifyJWT, verifyAdmin, addUser);
router.route("/users/:id").delete(verifyJWT, verifyAdmin, deleteUser);
router.route("/users/update-password").put(verifyJWT, updatePassword);

export default router;
