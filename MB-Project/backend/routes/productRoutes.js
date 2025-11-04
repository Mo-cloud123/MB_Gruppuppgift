import { Router } from "express";
import { getHealth } from "../controllers/productController.js";

const router = Router();

// Healthcheck (tillfälligt här)
router.get("/health", getHealth);

// CRUD för produkter läggs till i nästa branch

export default router;

