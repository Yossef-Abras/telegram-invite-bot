require('dotenv').config();
const { Telegraf } = require('telegraf');
const botToken = process.env.BOT_TOKEN;
const startHandler = require('./services/startService');
const checkHandler = require('./services/checkService');
const connectDB = require('./config/Db');
const bot = new Telegraf(botToken);
connectDB();
bot.start(startHandler);
bot.command('check', checkHandler);

bot.command('menu', async (ctx) => {
  await ctx.reply('Choose from the menu:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 Personal Information', callback_data: 'personal_info' }],
        [{ text: '👥 Your Referrals', callback_data: 'referrals_list' }],
        [{ text: '💸 Withdraw Balance', callback_data: 'withdraw_balance' }],
      ],
    },
  });
});

bot.action('personal_info', require('./services/personalInfoService'));
bot.action('referrals_list', require('./services/referralsListService'));
bot.action('withdraw_balance', require('./services/withdrawService'));

bot
  .launch()
  .then(() => console.log('🚀 Bot started successfully'))
  .catch((err) => console.error('❌ Bot start error:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
