'use strict';
const {
    Model
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
        date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};