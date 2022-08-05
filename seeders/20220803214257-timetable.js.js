"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("timetables", [
      {
        time: 1,
      },
      {
        time: 2,
      },
      {
        time: 3,
      },
      {
        time: 4,
      },
      {
        time: 5,
      },
      {
        time: 6,
      },
      {
        time: 7,
      },
      {
        time: 8,
      },
      {
        time: 9,
      },
      {
        time: 10,
      },
      {
        time: 11,
      },
      {
        time: 12,
      },
      {
        time: 13,
      },
      {
        time: 14,
      },
      {
        time: 15,
      },
      {
        time: 16,
      },
      {
        time: 17,
      },
      {
        time: 18,
      },
      {
        time: 19,
      },
      {
        time: 20,
      },
      {
        time: 21,
      },
      {
        time: 22,
      },
      {
        time: 23,
      },
      {
        time: 25,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("timetables", null, {});
  },
};
