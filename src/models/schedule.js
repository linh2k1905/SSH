'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {

        static associate(models) {
            Schedule.belongsTo(models.User, { foreignKey: 'idOwner' })
        }
    };
    Schedule.init({


        idOwner: DataTypes.INTEGER,
        time: DataTypes.STRING,
        date: DataTypes.STRING,
        currrentNumber: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};