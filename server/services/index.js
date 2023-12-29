const BcryptService = require('./BcryptService');
const BinaryService = require('./BinaryService');
const HexService = require('./HexService');
const MD5Service = require('./MD5Service');
const ShortService = require('./ShortService');
const SlugService = require('./SlugService');
const UUIDService = require('./UUIDService');
const getAiResponse = require('./Ai');
const getBrainlyAnswer = require('./Brainly');
const {
  getFacebook,
  getFacebookNormal,
  getFacebookHD,
  getFacebookAudio
} = require('./Facebook');
const gitClone = require('./Github');
const googleSearch = require('./Google');
const downloadInstagram = require('./Instagram');
const {
  pinterest,
  pinSearch
} = require('./Pinterest');
const {
  getPlaylistSpotify,
  getAlbumsSpotify,
  getSpotifySong
} = require('./Spotify');
const threadsDownload = require('./Threads');
const {
  getTiktokInfo,
  tiktokVideo,
  tiktokAudio,
  tiktokSound
} = require('./Tiktok');
const {
  getDataTwitter,
  downloadTwitterHigh,
  downloadTwitterLow,
  downloadTwitterAudio
} = require('./Twitter');
const {
  getYoutube,
  getYoutubeVideo,
  getYoutubeAudio
} = require('./Youtube');

module.exports = {
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
};
