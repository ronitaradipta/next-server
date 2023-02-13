'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { as: 'product' });
      this.belongsTo(models.User, { as: 'user' });
    }
  }
  Cart.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
