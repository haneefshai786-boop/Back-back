import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createOrder);
router.get("/my", userAuth, getUserOrders);

export default router;
