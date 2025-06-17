import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Word from "./models/Word.js";
import { register, login } from "./controllers/userController.js";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

// Connect to Database
await connectDB();

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

console.log("📌 Setting up routes...");

// Test endpoint
app.get("/test", (req, res) => {
  console.log("🔍 Test endpoint called");
  res.json({
    message: "Backend is working!",
    timestamp: new Date().toISOString(),
    status: "OK",
  });
});

// Auth routes
app.post("/register", register);
app.post("/login", login);

// Get all words
app.get("/", async (req, res) => {
  try {
    console.log("📝 Fetching all words...");
    const words = await Word.find();
    console.log(`📊 Found ${words.length} words`);
    res.json(words);
  } catch (err) {
    console.error("❌ Error fetching words:", err);
    res.status(500).json({ msg: "Server error while fetching words" });
  }
});

// Create word (protected route)
app.post("/create", authenticateToken, async (req, res) => {
  try {
    const { word } = req.body;
    const isPublic = req.body.public;

    console.log("➕ Creating new word:", word);

    if (!word) {
      return res.status(400).json({ msg: "Word is required" });
    }

    // Check if word already exists
    const existingWord = await Word.findOne({ word: word.toLowerCase() });
    if (existingWord) {
      console.log("⚠️ Word already exists:", word);
      return res.status(400).json({ msg: "Word already exists" });
    }

    const newWord = new Word({
      word: word.toLowerCase(),
      public: isPublic !== undefined ? isPublic : true,
    });

    await newWord.save();
    console.log("✅ Word created successfully:", word);
    res.status(201).json({ msg: "Word created successfully", word: newWord });
  } catch (err) {
    console.error("❌ Error creating word:", err);
    res.status(500).json({ msg: "Server error while creating word" });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("🚫 No token provided");
    return res.status(401).json({ msg: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret", (err, user) => {
    if (err) {
      console.log("🚫 Invalid token");
      return res.status(403).json({ msg: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// Start server
app.listen(port, () => {
  console.log("🚀 ====================================");
  console.log(`🚀 Hangman Backend Server Started!`);
  console.log(`🚀 ====================================`);
  console.log(`📍 Server URL: http://localhost:${port}`);
  console.log(`🔍 Test endpoint: http://localhost:${port}/test`);
  console.log(`🗄️ Database: MongoDB Connected`);
  console.log("🚀 ====================================");
  console.log("📋 Available endpoints:");
  console.log("   GET  /test      - Test connection");
  console.log("   GET  /          - Get all words");
  console.log("   POST /register  - Register user");
  console.log("   POST /login     - Login user");
  console.log("   POST /create    - Create word (requires auth)");
  console.log("🚀 ====================================");
});
