const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'UserRole',
      as: 'roles',
      foreignKey: 'userId',
    });
    User.hasOne(models.Store, {
      as: 'store',
      foreignKey: 'userId',
    });
    User.hasMany(models.Address, {
      as: 'addresses',
      foreignKey: 'userId',
    });
  };

  return User;
};
