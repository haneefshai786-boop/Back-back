import express from "express";
import { createFolder, getFolders } from "../controllers/folderController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getFolders);
router.post("/", protectAdmin, createFolder);

export default router;
