'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderNumber: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stores',
          key: 'id',
        },
      },
      customerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerDetail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['new', 'in_progress', 'delivered'],
        defaultValue: 'new',
        allowNull: false,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      responseMidtrans: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
