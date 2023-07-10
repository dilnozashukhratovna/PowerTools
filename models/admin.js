const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
    "admin",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
        },
        phone_number: {
            type: DataTypes.STRING(15),
        },
        otp_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Admin;
