'use strict';
const { Image } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images' [
      {
        url: 'image url',
        imageType: 'group',
        imageId: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {
      where: Image.findAll()
    })
  }
};
