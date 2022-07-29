const Sequelize = require("sequelize");

module.exports = class KorailData extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        //스키마 정해지먄 추가하기
      },
      {
        sequelize,
        timestamps: false,
        modelName: "KorailData",
        tableName: "KorailDatas",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
