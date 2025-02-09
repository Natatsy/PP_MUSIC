// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // To access .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB locally"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middlewares and routes can go here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
