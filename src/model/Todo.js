const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Todo = sequelize.define('Todo', {
        id: {
                type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true,
        },
        title: {
                type: DataTypes.STRING, allowNull: false,
        },
        completed: {
                type: DataTypes.BOOLEAN, defaultValue: false,
        },
});

module.exports = Todo;
