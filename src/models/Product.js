const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    description: Sequelize.STRING,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Store, {
      foreignKey: 'storeId',
    });
    Product.belongsTo(models.ProductCategory, {
      foreignKey: 'categoryId',
    });
    Product.hasMany(models.ProductGallery, {
      foreignKey: 'productId',
    });
  };

  return Product;
};
