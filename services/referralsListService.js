const User = require('../models/User');

module.exports = async (ctx) => {
  const from = ctx.from;
  const user = await User.findOne({ userId: from.id.toString() });

  if (!user) {
    await ctx.answerCbQuery('❌ Your account was not found.');
    return;
  }

  const referrals = await User.find({ referredBy: user.userId });
  const referralsCount = referrals.length;
  const referralNames =
    referrals.map((ref) => ref.username).join('\n') || 'No referrals yet.';

  await ctx.editMessageText(
    `
    👥 <b>Your Referrals:</b>
    🔢 Count: ${referralsCount}
    📜 Usernames:
    ${referralNames}
  `,
    { parse_mode: 'HTML' },
  );
};
