import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectUser, createOrder);
router.get("/my", protectUser, getUserOrders);

export default router;
