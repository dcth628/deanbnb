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
        imageType: 'Review',
        imageId: 1,
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Images"
    await queryInterface.bulkDelete(options)
  }
};
