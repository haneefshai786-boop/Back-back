import express from "express";
import {
  createVendor,
  getVendors,
  getVendorsByFolder,
} from "../controllers/vendorController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin
router.post("/", protectAdmin, createVendor);

// User
router.get("/", getVendors);
router.get("/folder/:folderId", getVendorsByFolder);

export default router;
