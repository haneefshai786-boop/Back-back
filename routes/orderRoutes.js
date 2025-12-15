import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protectUser, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/", protectUser, createOrder);
router.get("/myorders", protectUser, getUserOrders);

// Admin
router.get("/", protectAdmin, getAllOrders);
router.put("/:id", protectAdmin, updateOrderStatus);

export default router;
