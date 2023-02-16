'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    sex: DataTypes.STRING,
    address: DataTypes.STRING,
    staff: DataTypes.STRING,
    brithday: DataTypes.DATE,
    password: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};