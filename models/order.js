const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Client = require("./client");
const ShopTool = require("./shop_tool");

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_date: {
            type: DataTypes.DATE,
        },
        period: {
            type: DataTypes.DATE,
        },
        total_price: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Client.hasMany(Order);
Order.belongsTo(Client);

ShopTool.hasMany(Order);
Order.belongsTo(ShopTool);

module.exports = Order;
