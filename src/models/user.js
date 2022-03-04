'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'RoleId' }),
        User.hasMany(models.House, { foreignKey: 'idUser' }),
        User.hasMany(models.Comment, { foreignKey: 'userId' }),
        User.hasMany(models.Schedule, { foreignKey: 'idOwner' })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    roleId: DataTypes.NUMBER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};