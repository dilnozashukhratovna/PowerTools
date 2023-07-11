const ShopTool = require("../models/shop_tool");
const { ValidationError } = require("sequelize");

const addShopTool = async (ctx) => {
    try {
        const { rent_price, tool_price, shopId, toolId } = ctx.request.body;
        const newShopTool = await ShopTool.create({
            rent_price,
            tool_price,
            shopId,
            toolId,
        });
        ctx.status = 201;
        ctx.body = newShopTool;
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.status = 400;
            ctx.body = "Validation Error: " + error.message;
        } else {
            ctx.status = 500;
            ctx.body = "Internal Server Error";
        }
    }
};

const getAllShopTools = async (ctx) => {
    try {
        const ShopTools = await ShopTool.findAll();
        if (ShopTools.length === 0) {
            ctx.status = 400;
            ctx.body = "ShopTools not found";
        } else {
            ctx.status = 200;
            ctx.body = ShopTools;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getShopToolById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const ShopTool = await ShopTool.findByPk(id);
        if (!ShopTool) {
            ctx.status = 404;
            ctx.body = "ShopTool not found";
        } else {
            ctx.status = 200;
            ctx.body = ShopTool;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteShopTool = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedShopTool = await ShopTool.destroy({
            where: {
                id: id,
            },
        });
        if (deletedShopTool === 0) {
            ctx.status = 404;
            ctx.body = "ShopTool not found";
        } else {
            ctx.status = 200;
            ctx.body = "ShopTool deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateShopTool = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { rent_price, tool_price, shopId, toolId } = ctx.request.body;
        const [ShopTool] = await ShopTool.update(
            { rent_price, tool_price, shopId, toolId },
            {
                where: {
                    id: id,
                },
            }
        );
        if (ShopTool === 0) {
            ctx.status = 404;
            ctx.body = "ShopTool not found";
        } else {
            const updatedShopTool = await ShopTool.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedShopTool;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllShopTools,
    getShopToolById,
    addShopTool,
    deleteShopTool,
    updateShopTool,
};
