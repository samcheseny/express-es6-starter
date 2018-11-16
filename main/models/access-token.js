const {Sequelize} = require('sequelize');
const utils = require('../utils');

class AccessToken extends Sequelize.Model {

    constructor() {
        super();
    }

    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: () => utils.generateUUID()
                },
                userID: {
                    type: DataTypes.UUID,
                    allowNull: true,
                    field: 'user_id',
                    references: {model: 'users', key: 'id'},
                    validate: {
                        isUUID: 4
                    }
                },
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'client_id',
                    references: {model: 'clients', key: 'id'},
                    validate: {
                        isUUID: 4
                    }
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    }
                },
                expirationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    field: 'expiration_date'
                },
                scope: {
                    type: DataTypes.STRING,
                    allowNull: true
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
            },
            {
                tableName: "access_tokens",
                sequelize
            }
        )
    }

    static associate(models) {

        this.client = this.belongsTo(models.Client, {
            foreignKey: 'client_id',
            onDelete: 'CASCADE',
        });

        this.user = this.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });

    }
}

module.exports = AccessToken;