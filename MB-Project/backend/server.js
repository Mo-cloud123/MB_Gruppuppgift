import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mb_project";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB ansluten");
    app.listen(PORT, () => console.log(`Server kör på http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Kunde inte ansluta till MongoDB:", err.message);
    process.exit(1);
  });

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/products", productRoutes);

