'use strict';
const { Spot } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: '37.7645358',
        lng: '-122.4730327',
        name: 'AA',
        description: 'Place where web developers are created',
        price: 123,
        avgRating: 4.5,
        previewImage: 'image url'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots')
  }
};
