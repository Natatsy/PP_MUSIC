const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("../models/User");

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// Generate a random string for CSRF protection
const generateRandomString = (length) => {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
};

// Spotify login route
router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify(
    {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    }
  )}`;

  res.redirect(authUrl);
});

// Callback route
router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (!code || !state) {
    return res.status(400).json({ error: "Invalid authorization request" });
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get user details from Spotify
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id, display_name, email } = userResponse.data;

    // Store or update user in database
    const user = await User.findOneAndUpdate(
      { spotifyId: id },
      {
        spotifyId: id,
        displayName: display_name,
        email: email,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpires: new Date(Date.now() + expires_in * 1000),
      },
      { upsert: true, new: true }
    );

    // Generate JWT
    const jwtToken = jwt.sign(
      { spotifyId: id, access_token, refresh_token },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store JWT in a cookie
    res.cookie("spotify_jwt", jwtToken, { httpOnly: true, secure: false });

    res.redirect("/dashboard"); // Redirect to frontend
  } catch (error) {
    console.error("Authentication error:", error.response?.data || error);
    res.status(500).json({ error: "Error fetching access token" });
  }
});

// Refresh token route
router.get("/refresh", async (req, res) => {
  const token = req.cookies.spotify_jwt;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const refreshToken = decoded.refresh_token;

    const refreshResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        },
      }
    );

    const newAccessToken = refreshResponse.data.access_token;

    // Update JWT with the new access token
    const newJwtToken = jwt.sign(
      { access_token: newAccessToken, refresh_token: refreshToken },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("spotify_jwt", newJwtToken, { httpOnly: true, secure: false });

    res.json({ access_token: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Error refreshing access token" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("spotify_jwt");
  res.redirect("/"); // Redirect to homepage or login page
});

module.exports = router;
