var keys = require('./keys')

var mongoose = require('mongoose');
mongoose.connect(keys.db_uri, {useNewUrlParser: true});
let connected = false;

var dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
  connected = true;
  var GPSBoardSchema = new mongoose.Schema({
    text: String,
    altitude: Number,
    altitudeAccuracy: Number,
    latitude: Number,
    accuracy: Number,
    longitude: Number,
    heading: Number,
    speed: Number,
    stmp: Date,
  });

  mongoose.model('GPSBoard', GPSBoardSchema);
});


class DataBase {
  constructor(dbConnection) {
    console.log('db init: mongodb');
    this.connection = dbConnection;
  };

  addToTable(name, data) {
    console.log('create: data received, ', data)
    const GPS = mongoose.model('GPSBoard')
    data.stmp = Date.now()
    GPS.create(data, (err, result) => console.log(err, result))
  };

  async getTable(name) {
    const GPS = mongoose.model('GPSBoard')
    const table = await GPS.find({})
    console.log(table)
    return table
  }
}

const db = new DataBase(dbConnection)

module.exports = db