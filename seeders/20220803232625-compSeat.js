'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comps', [
      {
        comp_name: '1호차',
        comp_type: '일반석',
        train_id: 3, //ktx
      },
      {
        comp_name: '2호차',
        comp_type: '일반석',
        train_id: 3,
      },
      {
        comp_name: '3호차',
        comp_type: '특/우등',
        train_id: 3,
      },
      {
        comp_name: '1호차',
        comp_type: '일반석',
        train_id: 1, //새마을호
      },
      {
        comp_name: '2호차',
        comp_type: '일반석',
        train_id: 1,
      },
      {
        comp_name: '3호차',
        comp_type: '특/우등',
        train_id: 1,
      },
      {
        comp_name: '1호차',
        comp_type: '일반석',
        train_id: 2,
      },
      {
        comp_name: '2호차',
        comp_type: '일반석',
        train_id: 2,
      },
      {
        comp_name: '3호차',
        comp_type: '특/우등',
        train_id: 2,
      },
    ]);

    const comps = await queryInterface.sequelize.query(`SELECT id FROM comps;`);
    const compsRows = comps[0];
    let i = 0;
    for (i in compsRows) {
      await queryInterface.bulkInsert('seats', [
        {
          comp_id: compsRows[i].id,
          seat_name: '1A',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '1B',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '1C',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '1D',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '2A',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '2B',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '2C',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '2D',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '3A',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '3B',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '3C',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '3D',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '4A',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '4B',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '4C',
          is_booked: false,
        },
        {
          comp_id: compsRows[i].id,
          seat_name: '4D',
          is_booked: false,
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comps', null, {});
    await queryInterface.bulkDelete('seats', null, {});
  },
};
