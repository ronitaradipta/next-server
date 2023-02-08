const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const ProductGalleries = sequelize.define('ProductGalleries', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: Sequelize.STRING,
  });

  ProductGalleries.associate = (models) => {
    ProductGalleries.belongsTo(models.Product);
  };

  return ProductGalleries;
};
