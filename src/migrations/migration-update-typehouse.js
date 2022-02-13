module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('HouseTypes', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('HouseTypes', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};