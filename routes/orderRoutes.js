import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { userAuth } from "../middleware/authMiddleware.js";
import { adminAuth } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User
router.post("/", userAuth, createOrder);
router.get("/my", userAuth, getUserOrders);

// Admin
router.get("/", adminAuth, getAllOrders);
router.patch("/:id", adminAuth, updateOrderStatus);

export default router;
