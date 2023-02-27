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
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shippingCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountToPay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderStatus: {
        type: Sequelize.ENUM,
        values: ['pending', 'challenge', 'failure', 'success'],
        defaultValue: 'pending',
        allowNull: false,
      },
      shippingStatus: {
        type: Sequelize.ENUM,
        values: ['waiting_payment', 'new', 'in_progress', 'delivered'],
        defaultValue: 'waiting_payment',
        allowNull: false,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        unique: true,
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
