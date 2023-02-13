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
      shippingCost: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ['new', 'in_progress', 'delivered'],
        defaultValue: 'new',
      },
      trackingNumber: DataTypes.STRING,
      responseMidtrans: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
