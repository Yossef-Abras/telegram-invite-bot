const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: String,
  invites: { type: Number, default: 0 }, 
  balance: { type: Number, default: 0 }, 
  invitedBy: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
