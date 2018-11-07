const {Sequelize} = require('sequelize');

class Client extends Sequelize.Model {

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
                name: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                secret: {
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
                tableName: "clients",
                sequelize
            }
        )
    }

}

module.exports = new Client();