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
          image:
            'https://cf.shopee.co.id/file/998c7682fd5e7a3563b2ad00aaa4e6f3_tn',
          slug: 'buku',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Elektronik',
          image:
            'https://cf.shopee.co.id/file/dcd61dcb7c1448a132f49f938b0cb553_tn',
          slug: 'elektronik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Makanan & Minuman',
          image:
            'https://cf.shopee.co.id/file/7873b8c3824367239efb02d18eeab4f5_tn',
          slug: 'Makanan-dan-minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kosmetik',
          image:
            'https://cf.shopee.co.id/file/2715b985ae706a4c39a486f83da93c4b_tn',
          slug: 'Kosmetik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Otomotif',
          image:
            'https://cf.shopee.co.id/file/27838b968afb76ca59dd8e8f57ece91f_tn',
          slug: 'otomotif',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Fashion',
          image:
            'https://cf.shopee.co.id/file/04dba508f1ad19629518defb94999ef9_tn',
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
