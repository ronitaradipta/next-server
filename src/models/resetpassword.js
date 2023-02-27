"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class resetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  resetPassword.init(
    {
      userId: DataTypes.INTEGER,
      resetToken: DataTypes.STRING,
      ExpiresAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "resetPassword",
    }
  );
  return resetPassword;
};
