'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Houses', {

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
      idCity: {
        type: Sequelize.INTEGER
      },
      idTypeHouse: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
      ,
      address: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      descriptionEn: {
        type: Sequelize.TEXT
      },
      descriptionVi: {
        type: Sequelize.TEXT
      },
      area: {
        type: Sequelize.INTEGER
      },

      image: {
        type: Sequelize.BLOB('long')
      },
      lang: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "OK",
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
    await queryInterface.dropTable('Houses');
  }
};