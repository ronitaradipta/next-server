'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {}
  media.init({
    file: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};