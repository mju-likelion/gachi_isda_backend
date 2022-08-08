'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 1; i < 4; i++) {
      await queryInterface.bulkInsert('comps', [
        {
          comp_name: i + '호차',
          comp_type: '일반석',
          train_id: 1,
        },
        {
          comp_name: i + '호차',
          comp_type: '일반석',
          train_id: 2,
        },
        {
          comp_name: i + '호차',
          comp_type: '특/우등',
          train_id: 3,
        },
      ]);
    }

    const comps = await queryInterface.sequelize.query(`SELECT id FROM comps;`);
    const compsRows = comps[0];
    let i = 0;
    for (i in compsRows) {
      for (let j = 1; j < 5; j++) {
        await queryInterface.bulkInsert('seats', [
          {
            comp_id: compsRows[i].id,
            seat_name: j + 'A',
            is_booked: false,
          },
          {
            comp_id: compsRows[i].id,
            seat_name: j + 'B',
            is_booked: false,
          },
          {
            comp_id: compsRows[i].id,
            seat_name: j + 'C',
            is_booked: false,
          },
          {
            comp_id: compsRows[i].id,
            seat_name: j + 'D',
            is_booked: false,
          },
        ]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comps', null, {});
    await queryInterface.bulkDelete('seats', null, {});
  },
};
