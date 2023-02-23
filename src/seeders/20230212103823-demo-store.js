'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Stores',
      [
        {
          userId: 1,
          name: 'Toko Sederhana',
          description: 'Menyediakan segala kebutuhan sehari-hari anda',
          city: 'Jakarta',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  },
};
