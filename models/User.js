const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  spotifyId: { type: String, unique: true },
  displayName: String,
  email: { type: String, unique: true },
  accessToken: String,
  refreshToken: String,
  tokenExpires: Date,
});

module.exports = mongoose.model("User", UserSchema);
