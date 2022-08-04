const Sequelize = require("sequelize");

module.exports = class timetable extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        time: { type: Sequelize.INTEGER },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "timetable",
        tableName: "timetables",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
