const { findOrCreateUser } = require('./inviteService');
const { generateChannelLink } = require('../utils/referral');

module.exports = async (ctx) => {
  const startPayload = ctx.message.text?.split(' ')[1] || null;
  const from = ctx.from;

  if (!from.id) {
    console.error('❌ Error: Invalid userId!');
    return;
  }

  let referrerId = null;
  if (startPayload && startPayload.startsWith('ref_')) {
    referrerId = startPayload.split('_')[1];
  }

  await findOrCreateUser(from.id, from.username, referrerId);

  const channelLink = generateChannelLink();
  await ctx.replyWithHTML(`
    🚀 Welcome ${from.first_name}!
    🔗 Before proceeding, please join the channel:
    👉 <a href="${channelLink}">Click here to join</a>

    ✅ After joining, click /check to complete the process.
  `);
};
