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
          name: 'admin',
          email: 'admin01@gmail.com',
          password: hashPassword,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'John Doe',
          email: 'customer01@gmail.com',
          password: hashPassword,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alex Manik',
          email: 'customer02@gmail.com',
          password: hashPassword,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Michael Jackson',
          email: 'rivabayu50@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Allan Iverson',
          email: 'seller02@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lionel Messi',
          email: 'seller03@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Joko Susanto',
          email: 'seller04@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Agus hermawan',
          email: 'seller05@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tono Maulana',
          email: 'seller06@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rizal perdana Sahab',
          email: 'seller07@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Pertiwi Tika',
          email: 'seller08@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Michelle Syakila',
          email: 'seller09@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Suharto Mantono',
          email: 'seller10@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mega Hasanah',
          email: 'seller11@gmail.com',
          password: hashPassword,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rendi pangabean',
          email: 'seller12@gmail.com',
          password: hashPassword,
          roleId: 3,
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
