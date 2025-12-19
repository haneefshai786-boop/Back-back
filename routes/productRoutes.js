import express from "express";
import {
  createProduct,
  getProducts,
  getProductsBySubCategory
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ USER – fetch all products
router.get("/", getProducts);

// ✅ USER – fetch by subcategory
router.get("/subcategory/:id", getProductsBySubCategory);

// ✅ ADMIN – create product
router.post("/", protectAdmin, createProduct);

export default router;
