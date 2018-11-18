const {Sequelize} = require('sequelize');

class AccessToken extends Sequelize.Model {

    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true
                },
                userID: {
                    type: DataTypes.UUID,
                    allowNull: true,
                    field: 'user_id',
                    validate: {
                        isUUID: 4
                    }
                },
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'client_id',
                    validate: {
                        isUUID: 4
                    }
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
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
                    field: 'created_at'
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
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
            foreignKey: 'clientID',
            onDelete: 'CASCADE',
        });

        this.user = this.belongsTo(models.User, {
            foreignKey: 'userID',
            onDelete: 'CASCADE',
        });

    }
}

module.exports = AccessToken;