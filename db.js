const fs = require('fs');
const SEP = ' -/- '

class DataBase {
  constructor() {
    console.log('db init');
  };

  setTable(name, data) {
    fs.writeFileSync(name + '.db', data)
  };

  addToTable(name, data) {
    fs.appendFileSync(name + '.db', data.join(SEP) + '\n')
  };

  getTable(name) {
    const raw = fs.readFileSync(name + '.db', 'utf8');
    return this.parse(raw)
  }

  parse(raw) {
    return raw.split('\n').map(line => line.split(SEP))
  }
}

const db = new DataBase()

module.exports = db