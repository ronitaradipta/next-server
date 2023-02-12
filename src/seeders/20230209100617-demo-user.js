'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('Password123456*', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'john@gmail.com',
          password: hashPassword,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jean Badriah',
          email: 'jean@gmail.com',
          password: hashPassword,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
