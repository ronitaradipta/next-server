'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Stores',
      [
        {
          userId: 3,
          name: 'Toko Buku Barokah',
          description: 'Menjual buku-buku bermutu dengan harga bersaing',
          city: 'Medan',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          name: 'Toko Jaya Elektronika',
          description: 'Menyediakan segala macam keperluan elektrik',
          city: 'Jakarta',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          name: 'Toko Food & Baverages',
          description: 'Kami menjual frozen food untuk makanan khas daerah',
          city: 'Depok',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          name: 'Toko Kosmetik Glowing',
          description: 'Menjual produk kosmetik serba ada',
          city: 'Surabaya',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          name: 'Toko Fashion Citayam',
          description: 'Menjual pakaian asli buatan citayam',
          city: 'Bandung',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          name: 'Toko Otomotif Maju',
          description: 'Toko Khusus Spare part kendaraan roda dua dan empat terlengkap',
          city: 'Jakarta',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          name: 'Toko Buku Gramedia',
          description: 'Menjual beraneka Macam Buku',
          city: 'Surabaya',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          name: 'Toko Gunung Sari',
          description: 'Menjual berbagai macam peralatan Elektronik terlengkap',
          city: 'Bogor',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 11,
          name: 'Toko Delicious Food',
          description: 'Menjual Aneka Cemilann Khas Daerah',
          city: 'Bandung',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 12,
          name: 'Toko Maxglow',
          description: 'Kami menjual barang kosmetik pilihan pasti original',
          city: 'Tangerang',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 13,
          name: 'Fashion Kece',
          description: 'Menjual pakaian dan celana kekinian',
          city: 'Medan',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 14,
          name: 'Toko Engine Sport',
          description: 'Menjual spare part kendaraan bermotor roda dua pasti ori',
          city: 'Surabaya',
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
