module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Houses', 'idTypeHouse', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Houses', 'idTypeHouse', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ])
    }
};