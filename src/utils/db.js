const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development.url, {
    dialect: config.development.dialect, dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

module.exports = sequelize;
