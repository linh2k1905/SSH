module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Comments', 'status', {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'OK'
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Comments', 'status', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};