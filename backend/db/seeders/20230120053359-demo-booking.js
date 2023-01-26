'use strict';
const { Booking } = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2021-11-19"),
        endDate: new Date('2021-11-20'),
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date("2021-11-19"),
        endDate: new Date('2021-11-20'),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      where: Booking.findAll()
    })
  }
};
