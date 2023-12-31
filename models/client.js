const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Client = sequelize.define(
    "client",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        phone_number: {
            type: DataTypes.STRING(15),
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Client;
