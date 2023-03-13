'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Review } = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews"
    await queryInterface.bulkInsert(options, [
      {
        review: 'This was an awesome spot!',
        stars: 5,
        userId: 6,
        spotId: 1,
      },
      {
        review: 'This was a good spot!',
        stars: 4,
        userId: 4,
        spotId: 2,
      },
      {
        review: 'This was an okay spot!',
        stars: 4.5,
        userId: 5,
        spotId: 3,
      },
      {
        review: 'This was a just okay spot!',
        stars: 3.5,
        userId: 2,
        spotId: 4,
      },
      {
        review: 'This was a just okay spot!',
        stars: 3.5,
        userId: 1,
        spotId: 3,
      },
      {
        review: 'Interesting!!',
        stars: 3,
        userId: 1,
        spotId: 2,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews"
    await queryInterface.bulkDelete(options, {
      where: Review.findAll()
    })
  }
};
