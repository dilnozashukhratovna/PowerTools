const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const District = require("./district");

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
        phone_number: {
            type: DataTypes.STRING(15),
            unique: true,
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

Shop.belongsTo(District);
District.hasMany(Shop);

module.exports = Shop;
