const User = require('../models/User');

module.exports = async (ctx) => {
  const from = ctx.from;
  try {
    const user = await User.findOne({ userId: from.id.toString() });

    if (!user) {
      throw new Error('User not found');
    }

    const referralLink = user.referralLink;

    await ctx.editMessageText(
      `
      📊 <b>Personal Information:</b>
      👤 Username: ${user.username}
      💰 Current Balance: ${user.balance} points
      🔗 Referral Link:"${referralLink}"
      `,
      { parse_mode: 'HTML' },
    );
  } catch (error) {
    console.error('Error fetching referral link:', error);
    await ctx.reply('❌ An error occurred while fetching your information.');
  }
};
