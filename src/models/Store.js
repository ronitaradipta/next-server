const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Store = sequelize.define('Store', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      type: ['open', 'closed'],
      defaultValue: 'open',
    },
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'userId',
    });
    Store.hasMany(models.Product, {
      foreignKey: {
        allowNull: false,
        name: 'storeId',
      },
    });
  };

  return Store;
};
