const Sequelize = require('sequelize');

module.exports = class comp extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // comp_id: { type: Sequelize.INTEGER, primaryKey: true,},
        comp_name: { type: Sequelize.STRING(50) },
        comp_type: { type: Sequelize.STRING(50) },
        train_id: { type: Sequelize.STRING(10) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'comp',
        tableName: 'comps',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.comp.hasMany(db.seat, {
      foriegnKey: { name: 'comp_id', type: Sequelize.INTEGER },
      targetKey: 'id',
    }); //seat의 부모
    db.comp.belongsTo(db.train, {
      foriegnKey: { name: 'train_id', type: Sequelize.INTEGER },
      targetKey: 'id',
    });
  }
};
