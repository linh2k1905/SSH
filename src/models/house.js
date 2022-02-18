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
      House.belongsTo(models.User, { foreignKey: 'idUser' }),
        House.belongsTo(models.City, { foreignKey: 'idCity' }),
        House.belongsTo(models.HouseType, { foreignKey: 'idTypeHouse' })
    }
  };
  House.init({

    name: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    address: DataTypes.STRING,
    idCity: DataTypes.INTEGER,
    idTypeHouse: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    area: DataTypes.INTEGER,
    descriptionVi: DataTypes.TEXT,
    descriptionEn: DataTypes.TEXT,
    image: DataTypes.STRING,
    lang: DataTypes.STRING,
    lat: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};