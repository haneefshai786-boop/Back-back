import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, createProduct);
router.get("/", getProducts);

export default router;
