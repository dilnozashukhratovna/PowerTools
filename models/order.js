const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        client_id: {
            type: DataTypes.BIGINT,
        },
        shop_tool_id: {
            type: DataTypes.BIGINT,
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

module.exports = Order;
