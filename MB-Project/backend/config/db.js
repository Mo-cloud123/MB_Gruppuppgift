import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      dbName: "mb_project",
    });
    console.log("✅ MongoDB ansluten");
  } catch (err) {
    console.error("❌ MongoDB-fel:", err.message);
    process.exit(1);
  }
}

