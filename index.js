const TeleBot = require('telebot');
const {token} = require('./env')

const Handler = require('./Handler');

const bot = new TeleBot(token)

new Handler(bot)

bot.start()