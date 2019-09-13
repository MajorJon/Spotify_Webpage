const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  spotifyId: String
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
