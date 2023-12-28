const { telegramConfig } = require('../configs');
const { constants } = require('../utils');
const { exec } = require('child_process');
const util = require('util');
const {
  BcryptService,
  BinaryService,
  HexService,
  MD5Service,
  HelpService,
  ShortService,
  SlugService,
  UUIDService,
} = require('../services');

class BotController {
  constructor(bot, body) {
    this.bot = bot;
    this.text = body.message ? body.message.text : ''
    this.body = body;
  }

  async handle() {
    try {
      if (/\$ (.+)/.test(this.text)) {
          
      } else if (constants.COMMAND_SHORT_REGEX.test(this.text)) {
        const shortService = new ShortService(this.bot, this.body.message.chat.id, this.text);

        await shortService.short();
      } else if (constants.COMMAND_SLUG_REGEX.test(this.text)) {
        const slugService = new SlugService(this.bot, this.body.message.chat.id, this.text);

        await slugService.slug();
      } else if (constants.COMMAND_HEX_REGEX.test(this.text)) {
        const hexService = new HexService(this.bot, this.body.message.chat.id, this.text);

        await hexService.hex();
      } else if (constants.COMMAND_MD5_REGEX.test(this.text)) {
        const mD5Service = new MD5Service(this.bot, this.body.message.chat.id, this.text);

        await mD5Service.md5();
      } else if (constants.COMMAND_BCRYPT_REGEX.test(this.text)) {
        const bcryptService = new BcryptService(this.bot, this.body.message.chat.id, this.text);

        await bcryptService.bcrypt();
      } else if (constants.COMMAND_BINARY_REGEX.test(this.text)) {
        const binaryService = new BinaryService(this.bot, this.body.message.chat.id, this.text);

        await binaryService.binary();
      } else if (/\/(help|start|menu)/.test(this.text)) {
          const helpService = new HelpService(this.bot, this.body.message.chat.id);
          await helpService.help();
      } else if (constants.COMMAND_UUID_REGEX.test(this.text)) {
          const uUIDService = new UUIDService(this.bot, this.body.message.chat.id, this.text);
          await uUIDService.uuid();
      } else if (/(but|button)/.test(this.text)) {
          let butt = {
              caption: "button",
              reply_markup: JSON.stringify({
                  inline_keyboard: [
                      [{text: "Kucing", callback_data: "cat"}],
                      [{text: "Anjing", callback_data: "dog"}]
                  ]
              })
          }
          await this.bot.sendMessage(this.body.message.chat.id, "Tes Button", butt)
          await this.bot.sendMessage(this.body.message.chat.id, require("util").format(this.body))
      }
      switch (this.body.callback_query.data) {
          case "cat": {
              await this.bot.sendMessage(this.body.callback_query.from.id, "Cat bejir")
          }
          break
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BotController;
