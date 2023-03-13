'use strict';
const { Spot } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.bulkInsert(options , [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: '37.7645358',
        lng: '-122.4730327',
        name: 'AA',
        description: 'Place where web developers are',
        price: 123,
        avgRating: 4.5,
        previewImage: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360403/samples/landscapes/nature-mountains.jpg'
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
        description: 'Place where deep dishes are',
        price: 234,
        avgRating: 3,
        previewImage: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360399/samples/landscapes/beach-boat.jpg'
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
        description: 'Place where starbucks are',
        price: 199,
        avgRating: 4,
        previewImage: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360394/samples/animals/reindeer.jpg'
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
        description: 'Place where hipsters are',
        price: 199,
        avgRating: 5,
        previewImage: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360399/samples/landscapes/architecture-signs.jpg'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.bulkDelete(options)
  }
};
