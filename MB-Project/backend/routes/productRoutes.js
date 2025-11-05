import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);         // GET /api/products
router.get("/:id", getProduct);       // GET /api/products/:id
router.post("/", createProduct);      // POST /api/products
router.put("/:id", updateProduct);    // PUT /api/products/:id
router.delete("/:id", deleteProduct); // DELETE /api/products/:id

export default router;

