const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Tool = sequelize.define(
    "tool",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
        },
        brand: {
            type: DataTypes.STRING(30),
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Tool;
