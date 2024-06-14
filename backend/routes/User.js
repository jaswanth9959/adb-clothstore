import express from "express";
const router = express.Router();
import {
  getUserProfile,
  updateUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  getUsers,
  getUserById,
} from "../controllers/UserControllers.js";

router.route("/").post(registerUser).get(getUsers);
router.route("/profile").get(getUserProfile);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/:id").get(getUserById).put(updateUserProfile);

export default router;
