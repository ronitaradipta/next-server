'use strict';
const createSlug = require('../utils/createSlug');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ProductCategories',
      [
        {
          name: 'Buku',
          slug: 'buku',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Elektronik',
          slug: 'elektronik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Makanan & Minuman',
          slug: 'Makanan-dan-minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kosmetik',
          slug: 'Kosmetik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Otomotif',
          slug: 'otomotif',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Fashion',
          slug: 'fashion',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
