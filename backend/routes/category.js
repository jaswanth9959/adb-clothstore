import express from "express";
const router = express.Router();

import {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryControllers.js";

router.route("/").get(getCategories).post(addCategory);
router.route("/:id").put(updateCategory).get(getCategoryById);

export default router;
