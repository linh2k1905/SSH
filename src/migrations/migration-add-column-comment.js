module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Comments', 'status', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Comments', 'status', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ])
    }
};