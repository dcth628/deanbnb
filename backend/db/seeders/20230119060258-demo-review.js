'use strict';
const { Review } = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        review: 'This was an awesome spot!',
        stars: 5,
        userId: 1,
        spotId: 1,
      },
      {
        review: 'This was a good spot!',
        stars: 4,
        userId: 2,
        spotId: 2,
      },
      {
        review: 'This was an okay spot!',
        stars: 4.5,
        userId: 3,
        spotId: 3,
      },
      {
        review: 'This was a just okay spot!',
        stars: 3.5,
        userId: 4,
        spotId: 4,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      where: Review.findAll()
    })
  }
};
