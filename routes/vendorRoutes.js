import express from "express";
import {
  createVendor,
  getVendorsByFolder
} from "../controllers/vendorController.js";

import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public (user)
router.get("/folder/:folderId", getVendorsByFolder);

// Admin only
router.post("/", protectAdmin, createVendor);

export default router;
