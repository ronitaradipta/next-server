'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_profile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  user_profile.init(
    {
      userId: DataTypes.INTEGER,
      birth_day: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ['laki-laki', 'perempuan'],
        allowNull: true,
      },
      avatar: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_profile',
    }
  );
  return user_profile;
};
