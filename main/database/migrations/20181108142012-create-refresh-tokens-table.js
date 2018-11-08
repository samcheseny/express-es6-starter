'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('refresh-tokens', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            userID: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'user_id'
            },
            clientID: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'client_id'
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'refresh_token'
            },
            revoked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'updated_at'
            }
        });

    },

    down: (queryInterface, Sequelize) => queryInterface.dropTable('refresh-tokens')

};
