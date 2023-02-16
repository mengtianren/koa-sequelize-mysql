'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dict.init({
    type: DataTypes.STRING,
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dict',
  });
  return dict;
};