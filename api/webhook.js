process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { telegramConfig } = require('../server/configs');
const { BotController } = require('../server/controllers');

module.exports = async (request, response) => {
  try {
    const { body } = request;
    if (!body.update_id) {
      return;
    }
    const bot = new TelegramBot(telegramConfig.token);
    const botController = new BotController(bot, body);
    await botController.handle();
  } catch (error) {
    console.error(error);
  } finally {
    response.send();
  }
};
