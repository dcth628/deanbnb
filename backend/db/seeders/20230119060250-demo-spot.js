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
        previewImage: 'image url1'
      },
      {
        ownerId: 2,
        address: '123 Happy Lane',
        city: 'Chicago',
        state: 'Illions',
        country: 'United States of America',
        lat: '32.238423',
        lng: '-293.12347221',
        name: 'BB',
        description: 'Place where deep dishes are created',
        price: 234,
        avgRating: 3,
        previewImage: 'image url2'
      },
      {
        ownerId: 3,
        address: '123 Hope Lane',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States of America',
        lat: '37.7645358',
        lng: '-122.4730327',
        name: 'CC',
        description: 'Place where starbucks are created',
        price: 199,
        avgRating: 4,
        previewImage: 'image url3'
      },
      {
        ownerId: 4,
        address: '123 Smile Lane',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States of America',
        lat: '37.73345358',
        lng: '-100.4730327',
        name: 'DD',
        description: 'Place where hipsters are created',
        price: 199,
        avgRating: 5,
        previewImage: 'image url4'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots')
  }
};
