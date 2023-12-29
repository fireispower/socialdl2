const BotController = require('./BotController');
const {
  readDb,
  writeDb,
  addUserDb,
  changeBoolDb
} = require('./Database');
const Funcs = require('./Functions');

module.exports = {
  BotController,
  readDb,
  writeDb,
  addUserDb,
  changeBoolDb,
  Funcs
}