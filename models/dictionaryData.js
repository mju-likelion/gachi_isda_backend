const Sequelize = require("sequelize");

module.exports = class dictionaryData extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        loanword: { type: Sequelize.STRING(100) },
        meaning: { type: Sequelize.STRING(100) },
        ex_loan: { type: Sequelize.STRING(200) },
        ex_korean: { type: Sequelize.STRING(200) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "dictionaryData",
        tableName: "dictionaryDatas",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
