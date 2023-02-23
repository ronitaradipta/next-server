'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product);
    }
  }
  ProductCategory.init(
    {
      name: { type: DataTypes.STRING, unique: true },
      image: DataTypes.STRING,
      slug: { type: DataTypes.STRING, unique: true },
    },
    {
      sequelize,
      modelName: 'ProductCategory',
    }
  );
  return ProductCategory;
};
