const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRole',
      as: 'users',
      foreignKey: 'roleId',
    });
  };

  return Role;
};
