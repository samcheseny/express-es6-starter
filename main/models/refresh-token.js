const {Sequelize} = require('sequelize');
const utils = require('../utils');

class RefreshToken extends Sequelize.Model {

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
                    validate: {
                        isUUID: true,
                    }
                },
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    validate: {
                       isUUID: true,
                    }
                },
                refreshToken: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true,
                    }
                },
                revoked: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW
                }
            },
            {
                tableName: "refresh_tokens",
                sequelize
            }
        )
    }
}

module.exports = new RefreshToken();