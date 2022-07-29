const { Sequelize } = require("sequelize");
const KorailData = require("./KorailData");
const dictionaryData = require("./dictionaryData");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.KorailData = KorailData;
db.dictionaryData = dictionaryData;

dictionaryData.init(sequelize);

dictionaryData.associate(db);

module.exports = db;
