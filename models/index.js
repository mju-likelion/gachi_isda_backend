const { Sequelize } = require("sequelize");
const station = require("./station");
const train = require("./train");
const comp = require("./comp");
const seat = require("./seat");
const dictionaryData = require("./dictionaryData");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.station = station;
db.train = train;
db.comp = comp;
db.seat = seat;
db.dictionaryData = dictionaryData;

station.init(sequelize);
train.init(sequelize);
comp.init(sequelize);
seat.init(sequelize);
dictionaryData.init(sequelize);

station.associate(db);
train.associate(db);
comp.associate(db);
seat.associate(db);
dictionaryData.associate(db);

module.exports = db;
