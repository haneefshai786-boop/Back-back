import express from "express";
import { getProductsBySubCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/:subCategoryId/products", getProductsBySubCategory);

export default router;
