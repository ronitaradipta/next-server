'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasMany(models.Product);
      this.hasMany(models.Order);
      this.hasMany(models.SellerTransactions);
    }
  }
  Store.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      city: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      nextCoinBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Store',
    }
  );
  return Store;
};
