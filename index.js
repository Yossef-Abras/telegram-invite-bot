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

bot
  .launch()
  .then(() => console.log('🚀 Bot started successfully'))
  .catch((err) => console.error('❌ Bot start error:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
