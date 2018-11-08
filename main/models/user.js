const {Sequelize} = require('sequelize');
const utils = require('../utils');

class User extends Sequelize.Model {

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
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        is: /^[a-z]+$/i,
                        notNull: true,
                        notEmpty: true,
                    }
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate:{
                        isEmail: true,
                        notNull: true,
                        notEmpty: true,
                    }
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    get() {
                        return () => this.getDataValue('password');
                    }
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
                tableName: "users",
                sequelize
            }
        )
    }

}

module.exports = new User();
