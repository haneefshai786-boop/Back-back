import express from "express";
import { loginAdmin } from "../controllers/adminController.js"; // use loginAdmin

const router = express.Router();

// POST /api/admin/login
router.post("/login", loginAdmin); // fixed
export default router;
