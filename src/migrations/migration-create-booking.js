'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idHouse: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT
      },
      time: {
        type: Sequelize.STRING
      },

      date: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};