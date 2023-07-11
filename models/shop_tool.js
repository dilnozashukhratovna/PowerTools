const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Tool = require("./tool");
const Shop = require("./shop");

const ShopTool = sequelize.define(
    "shop_tool",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shop_id: {
            type: DataTypes.BIGINT,
        },
        tool_id: {
            type: DataTypes.BIGINT,
        },
        rent_price: {
            type: DataTypes.DECIMAL,
        },
        tool_price: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Shop.belongsToMany(Tool, { through: ShopTool });
Tool.belongsToMany(Shop, { through: ShopTool });

module.exports = ShopTool;
