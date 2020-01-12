const {token} = require('./env')

const Handler = require('./Handler');

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(token, {polling: true});

new Handler(bot)