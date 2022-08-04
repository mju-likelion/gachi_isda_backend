const Sequelize = require("sequelize");

module.exports = class seat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // seat_id: { type: Sequelize.INTEGER, primaryKey: true,},
        seat_name: { type: Sequelize.STRING(50) },
        is_booked: { type: Sequelize.BOOLEAN },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "seat",
        tableName: "seats",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.seat.belongsTo(db.comp, {
      foriegnKey: { name: "comp_id", type: Sequelize.INTEGER },
      targetKey: "id",
    }); //comp의 자식
  }
};
