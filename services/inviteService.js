const User = require('../models/User');
const referral_accounts_count = parseInt(process.env.REWARD_AMOUNT);

async function findOrCreateUser(userId, username, referrerId = null) {
  let user = await User.findOne({ userId });

  if (!user) {
    user = new User({
      userId: userId.toString(),
      username: username || 'unknown',
      referredBy: referrerId ? referrerId.toString() : null,
      hasJoined: false,
      balance: 0,
      referrals: [],
    });
    await user.save();
  }

  return user;
}

async function updateReferrerBalance(referrerId, newUserId) {
  const referrer = await User.findOne({ userId: referrerId });
  if (referrer) {
    referrer.balance += referral_accounts_count;
    referrer.referrals.push(newUserId);
    await referrer.save();
  }
}

async function checkUserMembership(ctx, user) {
  try {
    const member = await ctx.telegram.getChatMember(
      '@' + process.env.CHANNEL_ID,
      user.userId,
    );
    return ['member', 'administrator', 'creator'].includes(member.status);
  } catch (error) {
    console.error('❌ Error checking membership:', error);
    return false;
  }
}

module.exports = {
  findOrCreateUser,
  updateReferrerBalance,
  checkUserMembership,
};
