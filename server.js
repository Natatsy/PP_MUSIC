const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const spotifyAuthRoutes = require("./routes/auth"); // Correct import path for Spotify routes
const searchRoutes = require("./routes/search"); // Import search route

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.set("strictQuery", false); // Prevent deprecation warnings

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error(" Error connecting to MongoDB:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); // Allow frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/auth", spotifyAuthRoutes);
app.use("/search", searchRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send(" Welcome to the Spotify Auth Server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Global error handler
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(" Unhandled Promise Rejection:", err);
  process.exit(1);
});
