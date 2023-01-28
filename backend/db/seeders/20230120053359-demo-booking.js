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
        startDate: new Date("2021-11-19"),
        endDate: new Date('2021-11-20'),
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
