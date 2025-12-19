import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getSubCategoriesByCategory
} from "../controllers/categoryController.js";

import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin CRUD
router.post("/", protectAdmin, createCategory);
router.put("/:id", protectAdmin, updateCategory);
router.delete("/:id", protectAdmin, deleteCategory);

// User fetch
router.get("/", getCategories);
router.get("/:categoryId/subcategories", getSubCategoriesByCategory);

export default router;
