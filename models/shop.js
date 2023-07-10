const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Shop = sequelize.define(
    "shop",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
        },
        owner_id: {
            type: DataTypes.INTEGER,
        },
        phone_number: {
            type: DataTypes.STRING(15),
            unique: true,
        },
        district_id: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Shop;
