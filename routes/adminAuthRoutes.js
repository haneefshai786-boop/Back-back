import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

// POST /api/admin/auth/login
router.post("/login", loginAdmin);

// POST /api/admin/auth/register (optional)
router.post("/register", registerAdmin);

export default router;
