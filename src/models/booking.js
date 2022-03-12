'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        idUser: DataTypes.INTEGER,
        idHouse: DataTypes.INTEGER,
        time: DataTypes.STRING,
        date: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};