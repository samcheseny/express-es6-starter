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
                    validate: {
                        isUUID: 4
                    }
                },
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false,
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
                    allowNull: false
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
                tableName: "access_tokens",
                sequelize
            }
        )
    }
}

module.exports = new AccessToken();