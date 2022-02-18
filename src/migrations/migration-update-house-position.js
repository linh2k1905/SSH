module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Houses', 'lat', {
                type: Sequelize.STRING,
                allowNull: true,
            }),

        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Houses', 'lat', {
                type: Sequelize.STRING,
                allowNull: true,
            })

        ])
    }
};