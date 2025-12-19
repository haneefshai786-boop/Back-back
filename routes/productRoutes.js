import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Admin CRUD
router.post("/", protectAdmin, createProduct);

// User fetch
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
