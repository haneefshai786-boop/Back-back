import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin CRUD
router.post("/", protectAdmin, createProduct);
router.put("/:id", protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

// User fetch
router.get("/", getProducts);

export default router;
