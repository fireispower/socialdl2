const fs = require('fs');

class DB {
  function readDb(databaseName) {
    try {
      let data = fs.readFileSync(databaseName, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        writeDb({}, databaseName);
        return {};
      } else {
        throw err;
      }
    }
  }

  function writeDb(db, databaseName) {
    fs.writeFileSync(databaseName, JSON.stringify(db, null, 2), 'utf8');
  }

  function addUserDb(userid, databaseName) {
    const db = readDb(databaseName);
    if (!db[userid]) {
      db[userid] = {
        fbnormal: '',
        fbhd: '',
        fbmp3: '',
        twhd: '',
        twsd: '',
        twaud: ''
      };
      writeDb(db, databaseName);
    }
  }

  function changeBoolDb(userid, name, databaseName) {
    db = readDb(databaseName);
    if (db[userid]) {
      if (typeof db[userid][name] !== 'undefined') {
        db[userid][name] = !db[userid][name];
        writeDb(db, databaseName);
      }
    }
  }
}

module.exports = DB