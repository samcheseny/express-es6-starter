const {Sequelize} = require('sequelize');

class RefreshToken extends Sequelize.Model {

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
                        isUUID: true,
                    }
                },
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'client_id',
                    validate: {
                        isUUID: true,
                    }
                },
                refreshToken: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'refresh_token',
                    validate: {
                        notEmpty: true,
                    }
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
                tableName: "refresh_tokens",
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

        this.user = this.belongsTo(models.User, {
            foreignKey: 'userID',
            onDelete: 'CASCADE',
            as: 'user'
        });

    }
}

module.exports = RefreshToken;