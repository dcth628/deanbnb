'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'firstName',
      {
        type: Sequelize.STRING(30),
<<<<<<< HEAD
        allowNull: false
=======
>>>>>>> 695e113cb047bd20c69b889fb1f45f14138f955a
      })

      await queryInterface.addColumn(
        'Users',
        'lastName',
        {
          type: Sequelize.STRING(30),
<<<<<<< HEAD
          allowNull: false
=======
>>>>>>> 695e113cb047bd20c69b889fb1f45f14138f955a
        }
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
  }
};
