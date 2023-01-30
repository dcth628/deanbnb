'use strict';
const { Booking } = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
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
    await queryInterface.bulkDelete('Bookings', {
      where: Booking.findAll()
    })
  }
};
