'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userProduct.init({
    uid: DataTypes.STRING,
    pid: DataTypes.STRING,
    date: DataTypes.STRING,
    type: DataTypes.STRING,
    pice: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'userProduct',
  });
  return userProduct;
};