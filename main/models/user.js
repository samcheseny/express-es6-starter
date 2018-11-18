const {Sequelize} = require('sequelize');
const utils = require('../utils');

class User extends Sequelize.Model {

    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true
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
                    field: "name",
                    validate: {
                        notEmpty: true,
                    }
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: true,
                        notEmpty: true,//todo remove now as default type
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
                    field: 'created_at'
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
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
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
            as: 'client'
        });

        this.accessTokens = this.hasMany(models.AccessToken, {
            foreignKey: 'userID',
            as: 'accessTokens'
        });

        this.refreshTokens = this.hasMany(models.RefreshToken, {
            foreignKey: 'userID',
            as: 'refreshTokens'
        });

    }

}

module.exports = User;
