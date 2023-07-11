const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Shop = require("./shop");

const Owner = sequelize.define(
    "owner",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING(15),
        },
        otp_id: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Shop.belongsTo(Owner)
Owner.hasMany(Shop)


module.exports = Owner;
