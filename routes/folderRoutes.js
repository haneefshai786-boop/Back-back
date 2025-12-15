import express from "express";
import {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolders,
  getVendorsByFolder
} from "../controllers/folderController.js";
import { protectAdmin, protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin CRUD
router.post("/", protectAdmin, createFolder);
router.put("/:id", protectAdmin, updateFolder);
router.delete("/:id", protectAdmin, deleteFolder);

// User fetch
router.get("/", getFolders);
router.get("/:folderId/vendors", getVendorsByFolder);

export default router;
