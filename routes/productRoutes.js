import express from "express";
import {
  createProduct,
  getProductsBySubCategory,
  getProductById,
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * ADMIN
 */
router.post("/", protectAdmin, createProduct);

/**
 * USER
 */
router.get("/subcategory/:subCategoryId", getProductsBySubCategory);
router.get("/:id", getProductById);

export default router;
