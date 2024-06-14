import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductByID,
  deleteProduct,
  createProductVariant,
  deleteVariant,
  getVariant,
  editVariant,
  updateProduct,
  createProduct,
} from "../controllers/ProductControllers.js";

router.route("/").get(getProducts).post(createProduct);
router
  .route("/:id")
  .get(getProductByID)
  .delete(deleteProduct)
  .put(updateProduct);
router
  .route("/:id/variant")
  .post(createProductVariant)
  .delete(deleteVariant)
  .get(getVariant)
  .put(editVariant);

export default router;
