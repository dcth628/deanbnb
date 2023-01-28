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
        userId: 1,
        spotId: 1,
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
