import express from "express";
import {
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorsByFolder,
  getCategoriesByVendor
} from "../controllers/vendorController.js";

import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ADMIN CRUD
router.post("/", protectAdmin, createVendor);
router.put("/:id", protectAdmin, updateVendor);
router.delete("/:id", protectAdmin, deleteVendor);

// USER FLOW
router.get("/folder/:folderId", getVendorsByFolder);
router.get("/:vendorId/categories", getCategoriesByVendor);

export default router;
