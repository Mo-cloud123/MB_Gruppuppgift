import { Router } from "express";
import { me } from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Placeholder – visar hur auth middleware används
router.get("/me", requireAuth, me);

// Register/Login kommer i auth-branchen

export default router;

