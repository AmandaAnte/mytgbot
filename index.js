require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('欢迎使用我们的机器人！发送 /help 查看可用命令。');
});

bot.help((ctx) => {
  ctx.reply(
    '可用命令:\n' +
    '/start - 开始使用机器人\n' +
    '/help - 显示帮助信息\n' +
    '/about - 关于此机器人\n' +
    '/btc - 查询比特币价格\n' +
    '/eth - 查询以太坊价格\n' +
    '/sol - 查询Solana价格'
  );
});

bot.command('about', (ctx) => {
  ctx.reply('这是一个用 Telegraf 构建的 Telegram 机器人。');
});

bot.command('btc', async (ctx) => {
  try {
    ctx.reply('正在查询比特币价格，请稍候...');
    
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,cny');
    const btcPrice = response.data.bitcoin;
    
    const message = `💰 比特币 (BTC) 当前价格:\n` +
                   `💵 USD: $${btcPrice.usd.toLocaleString()}\n` +
                   `💴 CNY: ¥${btcPrice.cny.toLocaleString()}`;
    
    ctx.reply(message);
  } catch (error) {
    console.error('获取比特币价格失败:', error);
    ctx.reply('抱歉，无法获取比特币价格。请稍后再试。');
  }
});

bot.command('eth', async (ctx) => {
  try {
    ctx.reply('正在查询以太坊价格，请稍候...');
    
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,cny');
    const ethPrice = response.data.ethereum;
    
    const message = `⚡ 以太坊 (ETH) 当前价格:\n` +
                   `💵 USD: $${ethPrice.usd.toLocaleString()}\n` +
                   `💴 CNY: ¥${ethPrice.cny.toLocaleString()}`;
    
    ctx.reply(message);
  } catch (error) {
    console.error('获取以太坊价格失败:', error);
    ctx.reply('抱歉，无法获取以太坊价格。请稍后再试。');
  }
});

bot.command('sol', async (ctx) => {
  try {
    ctx.reply('正在查询Solana价格，请稍候...');
    
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd,cny');
    const solPrice = response.data.solana;
    
    const message = `☀️ Solana (SOL) 当前价格:\n` +
                   `💵 USD: $${solPrice.usd.toLocaleString()}\n` +
                   `💴 CNY: ¥${solPrice.cny.toLocaleString()}`;
    
    ctx.reply(message);
  } catch (error) {
    console.error('获取Solana价格失败:', error);
    ctx.reply('抱歉，无法获取Solana价格。请稍后再试。');
  }
});

bot.on('text', (ctx) => {
  ctx.reply(`你说: ${ctx.message.text}`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('机器人已启动...');