import express from "express";
import {
  createVendor,
  updateVendor,
  deleteVendor,
  getVendors,
  getCategoriesByVendor
} from "../controllers/vendorController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin CRUD
router.post("/", protectAdmin, createVendor);
router.put("/:id", protectAdmin, updateVendor);
router.delete("/:id", protectAdmin, deleteVendor);

// User fetch
router.get("/", getVendors);
router.get("/:vendorId/categories", getCategoriesByVendor);

export default router;
