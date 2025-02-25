const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

// Load JWT model
const JWTModel = mongoose.model(
  "JWT",
  new mongoose.Schema({
    token: String,
    createdAt: { type: Date, default: Date.now, expires: "1h" }, // Auto-delete after 1 hour
  })
);

// Middleware to validate JWT
const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token exists in the database
    const storedToken = await JWTModel.findOne({ token });
    if (!storedToken) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = decoded; // Store user info from JWT
    next(); // Move to the next middleware
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = validateJWT;
