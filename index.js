require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('欢迎使用我们的机器人！发送 /help 查看可用命令。');
});

bot.help((ctx) => {
  ctx.reply(
    '可用命令:\n' +
    '/start - 开始使用机器人\n' +
    '/help - 显示帮助信息\n' +
    '/about - 关于此机器人'
  );
});

bot.command('about', (ctx) => {
  ctx.reply('这是一个用 Telegraf 构建的 Telegram 机器人。');
});

bot.on('text', (ctx) => {
  ctx.reply(`你说: ${ctx.message.text}`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('机器人已启动...');