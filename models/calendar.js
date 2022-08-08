const Sequelize = require("sequelize");

module.exports = class calendar extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        date: { type: Sequelize.INTEGER },
        day: { type: Sequelize.STRING(10) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "calendar",
        tableName: "calendars",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
