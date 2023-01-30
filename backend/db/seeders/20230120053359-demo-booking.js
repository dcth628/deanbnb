'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Booking } = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Bookings"
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2023-11-19"),
        endDate: new Date('2023-11-20'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("2023-01-19"),
        endDate: new Date('2023-01-20'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date("2024-03-18"),
        endDate: new Date('2024-03-20'),
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date("2023-09-09"),
        endDate: new Date('2023-09-21'),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings"
    await queryInterface.bulkDelete(options, {
      where: Booking.findAll()
    })
  }
};
