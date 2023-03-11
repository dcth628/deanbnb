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
        url: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360414/cld-sample-3.jpg',
        imageType: 'Spot',
        imageId: 1,
        preview: true
      },
      {
        url: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360399/samples/landscapes/beach-boat.jpg',
        imageType: 'Spot',
        imageId: 2,
        preview: true
      },
      {
        url: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360394/samples/animals/reindeer.jpg',
        imageType: 'Review',
        imageId: 1,
        preview: true
      },
      {
        url: 'https://res.cloudinary.com/ddxewbhmy/image/upload/v1677360399/samples/landscapes/architecture-signs.jpg',
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
