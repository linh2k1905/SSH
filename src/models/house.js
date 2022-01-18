'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  House.init({

    name: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    address: DataTypes.STRING,
    idCity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    area: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};