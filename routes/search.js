const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to check if user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.cookies.spotify_jwt; // Read JWT from cookies

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.accessToken = decoded.access_token; // Attach Spotify token to request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Spotify Search API route
router.get("/", verifyToken, async (req, res) => {
  const { q, type } = req.query; // Get query parameters

  if (!q || !type) {
    return res.status(400).json({ error: "Missing search query or type" });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${req.accessToken}` },
      params: { q, type, limit: 10 },
    });

    res.json(response.data); // Return search results to frontend
  } catch (error) {
    console.error("Spotify Search Error:", error.response?.data || error);
    res.status(500).json({ error: "Error fetching search results" });
  }
});

module.exports = router;
