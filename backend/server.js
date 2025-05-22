import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import wordRoutes from "./routes/wordRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const app = express();
  await connectDB();
  
  app.use(cors());
  app.use(express.json());
  
  app.use(userRoutes, wordRoutes);
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
})();
