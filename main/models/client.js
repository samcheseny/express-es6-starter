const {Sequelize} = require('sequelize');
const utils = require('../utils');

class Client extends Sequelize.Model {

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
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    }
                },
                secret: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    }
                },
                active: {
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
                tableName: "clients",
                sequelize
            }
        )
    }

    static associate(models) {

        this.users = this.hasMany(models.User, {
            foreignKey: 'client_id',
            as: 'users'
        });

        this.accessTokens = this.hasMany(models.AccessToken, {
            foreignKey: 'client_id',
            as: 'accessTokens'
        });

        this.refreshTokens = this.hasMany(models.RefreshToken, {
            foreignKey: 'client_id',
            as: 'refreshTokens'
        });

    }

}

module.exports = new Client();