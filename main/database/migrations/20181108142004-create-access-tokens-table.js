'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('access_tokens', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true
            },
            userID: {
                type: Sequelize.UUID,
                allowNull: true,
                field: 'user_id',
                references: {model: 'users', key: 'id'}
            },
            clientID: {
                type: Sequelize.UUID,
                allowNull: false,
                field: 'client_id',
                references: {model: 'clients', key: 'id'}
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            expirationDate: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'expiration_date'
            },
            scope: {
                type: Sequelize.STRING,
                allowNull: true
            },
            revoked: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                field: 'updated_at'
            }
        });

    },

    down: (queryInterface, Sequelize) => queryInterface.dropTable('access_tokens')
};
