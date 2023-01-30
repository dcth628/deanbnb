'use strict';
const bcrypt = require("bcryptjs")
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Alex',
        lastName: 'Cor',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Doe',
        lastName: 'Ple',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakerUser2',
        firstName: 'Tien',
        lastName: 'Kers',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        username: 'FakerUser3',
        firstName: 'Lase',
        lastName: 'Psine',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user4@user.io',
        username: 'FakerUser4',
        firstName: 'Nies',
        lastName: 'Aeiens',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user5@user.io',
        username: 'FakerUser5',
        firstName: 'Bseirs',
        lastName: 'Wesefe',
        hashedPassword: bcrypt.hashSync('password6')
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demon-lition', 'FakeUser1', 'FakeUser2']}
    }, {})
  }
};
