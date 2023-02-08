const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Address = sequelize.define('Address', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    regency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return Address;
};
