const Sequelize = require("sequelize");

module.exports = class station extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        station_id: { type: Sequelize.STRING(50) },
        station_name: { type: Sequelize.STRING(50) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "station",
        tableName: "stations",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
