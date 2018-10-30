const {Sequelize} = require('sequelize');

class User extends Sequelize.Model {

    constructor() {
        super();
    }

    static init(sequelize, DataTypes) {
        return super.init(
            {
                username: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
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
