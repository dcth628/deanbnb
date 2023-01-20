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
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      where: Review.findAll()
    })
  }
};
