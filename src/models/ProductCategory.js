const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
  });

  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product, {
      foreignKey: {
        allowNull: false,
        name: 'categoryId',
      },
    });
  };

  return Product;
};
