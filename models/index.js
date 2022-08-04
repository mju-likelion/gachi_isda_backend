const { Sequelize } = require("sequelize");
const station = require("./station");
const train = require("./train");
const comp = require("./comp");
const seat = require("./seat");
const timetable = require("./timetable");
const calendar = require("./calendar");
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

db.timetable = timetable;
db.calendar = calendar;
db.station = station;
db.train = train;
db.comp = comp;
db.seat = seat;
db.dictionaryData = dictionaryData;

timetable.init(sequelize);
calendar.init(sequelize);
station.init(sequelize);
train.init(sequelize);
comp.init(sequelize);
seat.init(sequelize);
dictionaryData.init(sequelize);

timetable.associate(db);
calendar.associate(db);
station.associate(db);
train.associate(db);
comp.associate(db);
seat.associate(db);
dictionaryData.associate(db);

module.exports = db;
