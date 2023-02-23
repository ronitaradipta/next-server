'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.OrderDetails);
      this.belongsTo(models.User, { as: 'user' });
      this.belongsTo(models.Store, { as: 'store' });
    }
  }
  Order.init(
    {
      orderNumber: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      userId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      customerAddress: DataTypes.STRING,
      customerDetail: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      shippingCost: DataTypes.INTEGER,
      amountToPay: DataTypes.INTEGER,
      orderStatus: {
        type: DataTypes.ENUM,
        values: ['pending', 'challenge', 'failure', 'success'],
        defaultValue: 'pending',
      },
      shippingStatus: {
        type: DataTypes.ENUM,
        values: ['waiting_payment', 'new', 'in_progress', 'delivered'],
        defaultValue: 'waiting_payment',
      },
      trackingNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
