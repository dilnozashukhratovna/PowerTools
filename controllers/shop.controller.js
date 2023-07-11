const Shop = require("../models/shop");
const { ValidationError } = require("sequelize");
const Tool = require("../models/tool");

const addShop = async (ctx) => {
    try {
        const { name, phone_number, district_id, address, location, ownerId } =
            ctx.request.body;
        const newShop = await Shop.create({
            name,
            phone_number,
            district_id,
            address,
            location,
            ownerId,
        });
        ctx.status = 201;
        ctx.body = newShop;
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

const getAllShops = async (ctx) => {
    try {
        const shops = await Shop.findAll({include: Tool});
        if (shops.length === 0) {
            ctx.status = 400;
            ctx.body = "Shops not found";
        } else {
            ctx.status = 200;
            ctx.body = shops;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getShopById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const shop = await Shop.findByPk(id);
        if (!shop) {
            ctx.status = 404;
            ctx.body = "Shop not found";
        } else {
            ctx.status = 200;
            ctx.body = shop;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteShop = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedShop = await Shop.destroy({
            where: {
                id: id,
            },
        });
        if (deletedShop === 0) {
            ctx.status = 404;
            ctx.body = "Shop not found";
        } else {
            ctx.status = 200;
            ctx.body = "Shop deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateShop = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { name, phone_number, district_id, address, location, ownerId } =
            ctx.request.body;
        const [shop] = await Shop.update(
            { name, phone_number, district_id, address, location, ownerId },
            {
                where: {
                    id: id,
                },
            }
        );
        if (shop === 0) {
            ctx.status = 404;
            ctx.body = "Shop not found";
        } else {
            const updatedShop = await Shop.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedShop;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllShops,
    getShopById,
    addShop,
    deleteShop,
    updateShop,
};
