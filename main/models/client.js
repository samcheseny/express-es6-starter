const {Sequelize} = require('sequelize');
const utils = require('../utils');

class Client extends Sequelize.Model {

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
                        notNull: true,
                        notEmpty: true,
                    }
                },
                secret: {
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
                tableName: "clients",
                sequelize
            }
        )
    }

}

module.exports = new Client();