'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HouseType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HouseType.hasMany(models.House, { foreignKey: 'idTypeHouse' })
    }
  };
  HouseType.init({

    name: DataTypes.STRING,
    nameVi: DataTypes.STRING,
    image: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'HouseType',
  },
  );
  return HouseType;
};