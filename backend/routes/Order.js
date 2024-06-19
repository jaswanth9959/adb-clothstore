import express from "express";
const router = express.Router();
import {
  getMyOrders,
  getOrderById,
  addOrderItems,
  getAllOrders,
  updateOrderStatus,
  updatePickUpStatus,
} from "../controllers/OrderControllers.js";
router.route("/").post(addOrderItems).get(getAllOrders);

router.route("/:id").get(getOrderById);
router.route("/:id/update").put(updateOrderStatus);
router.route("/:id/pickup").put(updatePickUpStatus);
router.route("/mine/:id").get(getMyOrders);
export default router;
