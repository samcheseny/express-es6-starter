const {Sequelize} = require('sequelize');
const utils = require('../utils');

class User extends Sequelize.Model {

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
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'client_id',
                    validate: {
                        isUUID: 4
                    }
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        is: /^[a-z]+$/i,
                        notNull: true,
                        notEmpty: true,
                    }
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: true,
                        notNull: true,
                        notEmpty: true,
                    }
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    get() {
                        return () => this.getDataValue('password');
                    }
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
                tableName: "users",
                sequelize
            }
        )
    }

    static associate(models) {

        this.client = this.belongsTo(models.Client, {
            foreignKey: 'client_id',
            onDelete: 'CASCADE'
        });

        this.accessTokens = this.hasMany(models.AccessToken, {
            foreignKey: 'user_id',
            as: 'accessTokens'
        });

        this.refreshTokens = this.hasMany(models.RefreshToken, {
            foreignKey: 'user_id',
            as: 'refreshTokens'
        });

    }

}

module.exports = new User();
