'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SellerTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, { as: 'store' });
    }
  }
  SellerTransactions.init(
    {
      storeId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      bankAccount: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'success', 'failed'],
        defaultValue: 'pending',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SellerTransactions',
    }
  );
  return SellerTransactions;
};
