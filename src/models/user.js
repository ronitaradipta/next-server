'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role);
      this.hasOne(models.Store);
      this.hasMany(models.Address);
      this.hasMany(models.Cart);
      this.hasMany(models.Order);
      this.hasMany(models.ProductReview);
      this.hasMany(models.Otp);
      this.hasMany(models.resetPassword);
      this.hasOne(models.user_profile);
      this.hasOne(models.refreshtoken);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
