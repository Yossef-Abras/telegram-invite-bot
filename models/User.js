const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String },
  referredBy: { type: String, default: null },
  balance: { type: Number, default: 0 },
  hasJoined: { type: Boolean, default: false },
  referrals: [{ type: String }],
  referralLink: { type: String, default: null },
});

module.exports = mongoose.model('User', userSchema);
