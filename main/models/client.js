const {Sequelize} = require('sequelize');

class Client extends Sequelize.Model {

    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        notEmpty: true,
                    }
                },
                secret: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
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
                    field: 'created_at'
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
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
            foreignKey: 'clientID',
            as: 'users'
        });

        this.accessTokens = this.hasMany(models.AccessToken, {
            foreignKey: 'clientID',
            as: 'accessTokens'
        });

        this.refreshTokens = this.hasMany(models.RefreshToken, {
            foreignKey: 'clientID',
            as: 'refreshTokens'
        });

    }

}

module.exports = Client;