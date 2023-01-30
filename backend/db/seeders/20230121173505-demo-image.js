'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Images"
    await queryInterface.bulkInsert(options, [
      {
        url: 'image url',
        imageType: 'Spot',
        imageId: 1,
        preview: true
      },
      {
        url: 'image url2',
        imageType: 'Spot',
        imageId: 2,
        preview: true
      },
      {
        url: 'image url3',
        imageType: 'Review',
        imageId: 1,
        preview: true
      },
      {
        url: 'image url4',
        imageType: 'Spot',
        imageId: 3,
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Images"
    await queryInterface.bulkDelete(options)
  }
};
