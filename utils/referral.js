require('dotenv').config();
const botUsername = process.env.BOT_USERNAME;
const cannel_id = process.env.CHANNEL_ID;
function generateReferralLink(userId) {
  return `https://t.me/${botUsername}?start=ref_${userId}`;
}

function generateChannelLink() {
  return `https://t.me/${cannel_id}`;
}

module.exports = { generateReferralLink, generateChannelLink };
