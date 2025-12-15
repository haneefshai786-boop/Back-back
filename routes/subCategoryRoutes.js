import express from "express";
import {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories,
  getProductsBySubCategory
} from "../controllers/subCategoryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin CRUD
router.post("/", protectAdmin, createSubCategory);
router.put("/:id", protectAdmin, updateSubCategory);
router.delete("/:id", protectAdmin, deleteSubCategory);

// User fetch
router.get("/", getSubCategories);
router.get("/:subCategoryId/products", getProductsBySubCategory);

export default router;
