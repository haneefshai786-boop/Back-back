import express from "express";
import {
  createProduct,
  getProducts,
  getProductsBySubCategory
} from "../controllers/productController.js";

import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ADMIN */
router.post("/", protectAdmin, createProduct);

/* USER */
router.get("/", getProducts);
router.get("/subcategory/:id", getProductsBySubCategory);

export default router;
