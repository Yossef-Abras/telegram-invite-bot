const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String },
  referredBy: { type: String, default: null }, // تغيير من ObjectId إلى String
  balance: { type: Number, default: 0 },
  hasJoined: { type: Boolean, default: false },
  referrals: [{ type: String }], // تغيير نوع القيم داخل المصفوفة إلى String
});

module.exports = mongoose.model('User', userSchema);
