'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { add, set } = require('date-fns');

    const trainType = ['KTX', '새마을호', '무궁화호'];
    const now = new Date('2022-08-20T09:00:00Z');
    console.log(now);
    for (let i = 0; i < 3; i++) {
      await queryInterface.bulkInsert('Trains', [
        //서울-김천구미
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 0 }), //9시
          arr_pland_time: add(now, { hours: 1 + i, minutes: 15 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 2, minutes: 25 }),
          arr_pland_time: add(now, { hours: 3 + i, minutes: 40 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 4, minutes: 15 }),
          arr_pland_time: add(now, { hours: 5 + i, minutes: 30 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 6, minutes: 25 }),
          arr_pland_time: add(now, { hours: 7 + i, minutes: 40 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 8 }),
          arr_pland_time: add(now, { hours: 9 + i, minutes: 15 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 10 }),
          arr_pland_time: add(now, { hours: 11 + i, minutes: 15 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { hours: 12 }),
          arr_pland_time: add(now, { hours: 13 + i, minutes: 15 }),
          dep_place_name: '서울',
          arr_place_name: '김천구미',
        },
        //수원-부산
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 0, minutes: 30 }),
          arr_pland_time: add(now, { days: 10, hours: i + 2 }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 1, minutes: 25 }),
          arr_pland_time: add(now, {
            days: 10,
            hours: i + 3,
            minutes: 55,
          }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 3, minutes: 40 }),
          arr_pland_time: add(now, {
            days: 10,
            hours: i + 6,
            minutes: 10,
          }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 5, minutes: 40 }),
          arr_pland_time: add(now, {
            days: 10,
            hours: i + 8,
            minutes: 10,
          }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 7 }),
          arr_pland_time: add(now, { days: 10, hours: i + 9, minutes: 30 }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 9 }),
          arr_pland_time: add(now, { days: 10, hours: i + 11, minutes: 30 }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
        {
          train_grade_name: trainType[i],
          dep_pland_time: add(now, { days: 10, hours: 11 }),
          arr_pland_time: add(now, { days: 10, hours: i + 13, minutes: 30 }),
          dep_place_name: '수원',
          arr_place_name: '부산',
        },
      ]);
    }

    const trains = await queryInterface.sequelize.query(
      `SELECT id FROM Trains;`
    );
    const trainsRows = trains[0];

    for (let i in trainsRows) {
      await queryInterface.bulkInsert('Comps', [
        {
          train_id: trainsRows[i].id,
          comp_name: '1호차',
          comp_type: '일반석',
        },
        {
          train_id: trainsRows[i].id,
          comp_name: '2호차',
          comp_type: '일반석',
        },
        {
          train_id: trainsRows[i].id,
          comp_name: '3호차',
          comp_type: '특/우등',
        },
      ]);
    }

    const comps = await queryInterface.sequelize.query(`SELECT id FROM Comps;`);
    const compsRows = comps[0];

    for (let i in compsRows) {
      for (let j = 1; j < 5; j++) {
        await queryInterface.bulkInsert('Seats', [
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
    await queryInterface.bulkDelete('Comps', null, {});
    await queryInterface.bulkDelete('Seats', null, {});
    await queryInterface.bulkDelete('Trains', null, {});
  },
};
