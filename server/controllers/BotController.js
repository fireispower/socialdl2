const { telegramConfig } = require('../configs');
const { constants } = require('../utils');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const { getBanned } = require('./Functions');
const {
  BcryptService,
  BinaryService,
  HexService,
  MD5Service,
  ShortService,
  SlugService,
  UUIDService,
  getAiResponse,
  getBrainlyAnswer,
  getFacebook,
  getFacebookNormal,
  getFacebookHD,
  getFacebookAudio,
  googleSearch,
  downloadInstagram,
  pinterest,
  pinSearch,
  getPlaylistSpotify,
  getAlbumsSpotify,
  getSpotifySong,
  threadsDownload,
  getTiktokInfo,
  tiktokVideo,
  tiktokAudio,
  tiktokSound,
  getDataTwitter,
  downloadTwitterHigh,
  downloadTwitterLow,
  downloadTwitterAudio,
  getYoutube,
  getYoutubeVideo,
  getYoutubeAudio
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
          let input = this.text.replace('$ ', '');
          exec(input, async (err, stdout) => {
              if (err) await this.bot.sendMessage(this.body.message.chat.id, `Error: ${err}`)
              if (stdout) await this.bot.sendMessage(this.body.message.chat.id, util.format(stdout))
          })
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
        let getban = await getBanned(this.body.message.from.id);
        if (!getban.status) return this.bot.sendMessage(this.body.message.chat.id, `You have been banned\n\nReason : ${getban.reason}\n\nDo you want to be able to use bots again? Please contact the owner to request removal of the ban\nOwner : ${constants.OWNER}`)
  let response = `Hello I am ${constants.BOTNAME}

Please send a link to the video or post you want to download, the bot only supports social media on the list

LIST :
• Threads
• Tiktok
• Instagram
• Twitter
• Facebook
• Pinterest
• Spotify
• Github

DEVELOPER FEATURES
/bcrypt __text__ - Text to bcrypt hash
/binary __text__ - Text to binary
/hex __text__ - HEX to ASCII
/md5 __text__ - Text to MD5 hash
/short __url__ - Short url
/slug __text__ - Slug text
/uuid - Generate UUID

OTHER FEATURES
/ai __text__ - AI uses GPT
/brainly __text__ - Search Questions ( id )
/pin __text__ - Search image on Pinterest
/google __text__ - Search on Google

Bot by ${constants.OWNER}`
        let opts = {
          caption: response,
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Bot Creator', url: `t.me/${constants.OWNER.replace('@', '')}` }],
              [{ text: 'Source Code Bot', url: `https://github.com/krxuv/filefetcher-bot` }]
            ]
          })
        }
        let db = await readDb('/tmp/database.json');
        let chatId = this.body.message.from.id;
        if (!db[chatId]) {
          await addUserDb(chatId, '/tmp/database.json');
          await this.bot.sendPhoto(chatId, constants.MENU_THUMB, opts);
          db = await readDb('/tmp/database.json');
        } else if (db[chatId]) {
          await this.bot.sendPhoto(chatId, constants.MENU_THUMB, opts);
        }
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
          await fs.writeFileSync('./waduh.txt', 'hahha brjir')
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
