const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../database/config.json')[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const AccessToken = require('./access-token');
const Client = require('./client');
const RefreshToken = require('./refresh-token');
const User = require('./user');

const models = {
    AccessToken: AccessToken.init(sequelize, Sequelize),
    Client: Client.init(sequelize, Sequelize),
    RefreshToken: RefreshToken.init(sequelize, Sequelize),
    User: User.init(sequelize, Sequelize)
};

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

module.exports = db;
