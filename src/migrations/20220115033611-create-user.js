'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      // firstName: DataTypes.STRING,
      // lastName: DataTypes.STRING,
      // password: DataTypes.STRING,
      // email: DataTypes.STRING,
      // tel: DataTypes.STRING,
      // address: DataTypes.STRING,
      // roleId: DataTypes.STRING,
      // image: DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      roleID: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      image: {
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
    await queryInterface.dropTable('Users');
  }
};