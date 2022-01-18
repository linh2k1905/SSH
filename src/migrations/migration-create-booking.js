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
      name: {
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      idHouse: {
        type: Sequelize.INTEGER
      },

      description: {
        type: Sequelize.TEXT
      },
      time: {
        type: Sequelize.STRING
      },

      date: {
        type: Sequelize.DATE
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