const {Sequelize} = require('sequelize');

class RefreshToken extends Sequelize.Model {

    constructor() {
        super();
    }

    static init(sequelize, DataTypes) {
        return super.init(
            {
                uuid: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true
                },
                userID: {
                    type: DataTypes.UUID,
                    allowNull: true
                },
                clientID: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                revoked: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updated_at: {
                    type: DataTypes.NOW,
                    allowNull: false
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