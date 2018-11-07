const {Sequelize} = require('sequelize');

class User extends Sequelize.Model {

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
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
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
                tableName: "users",
                sequelize
            }
        )
    }

}

module.exports = new User();
