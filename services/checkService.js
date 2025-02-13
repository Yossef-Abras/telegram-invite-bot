const {
  findOrCreateUser,
  updateReferrerBalance,
  checkUserMembership,
} = require('./inviteService');
const { generateReferralLink } = require('../utils/referral');

module.exports = async (ctx) => {
  const from = ctx.from;

  if (!from.id) {
    console.error('❌ Error: Invalid userId!');
    return;
  }

  let user = await findOrCreateUser(from.id, from.username);

  const isMember = await checkUserMembership(ctx, user);

  if (isMember) {
    if (!user.hasJoined) {
      user.hasJoined = true;
      await user.save();

      if (user.referredBy) {
        await updateReferrerBalance(user.referredBy, user.userId);
      }

      const referralLink = generateReferralLink(from.id);
      await ctx.replyWithHTML(`
        🎉 Your membership has been successfully confirmed!
        🔗 Your referral link: <code>${referralLink}</code>
        💰 Your current balance: ${user.balance} points
      `);
    } else {
      await ctx.reply('❌ You have already joined the channel before.');
    }
  } else {
    await ctx.reply('❌ You were not found in the channel! Make sure to join.');
  }
};
