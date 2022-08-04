const Sequelize = require("sequelize");

module.exports = class train extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        train_id: { type: Sequelize.STRING(10) },
        train_grade_name: { type: Sequelize.STRING(50) },
        dep_pland_time: { type: Sequelize.STRING(50) },
        arr_pland_time: { type: Sequelize.STRING(50) },
        dep_place_name: { type: Sequelize.STRING(50) },
        arr_place_name: { type: Sequelize.STRING(50) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "train",
        tableName: "trains",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
