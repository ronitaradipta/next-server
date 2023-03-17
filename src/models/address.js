'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'user' });
    }
  }
  Address.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      address: DataTypes.TEXT,
      regency: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};
