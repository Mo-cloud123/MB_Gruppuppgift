import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Root + 404
app.get("/", (_req, res) => res.send("Backend up 🚀"));
app.use((req, res) => res.status(404).json({ message: "Not found", path: req.originalUrl }));

// Starta
const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`✅ Server kör på http://localhost:${PORT}`));
})();

