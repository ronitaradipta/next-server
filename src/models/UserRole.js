const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });

  return UserRole;
};
