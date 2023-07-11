const Owner = require("../models/owner");
const { ValidationError } = require("sequelize");
const Shop = require("../models/shop");

const addOwner = async (ctx) => {
    try {
        const { name, phone_number } = ctx.request.body;
        const newOwner = await Owner.create({
            name,
            phone_number,
        });
        ctx.status = 201;
        ctx.body = newOwner;
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

const getAllOwners = async (ctx) => {
    try {
        const owners = await Owner.findAll({include: Shop});
        // const owners = await Owner.findAll({ model: Shop, required: true });

        if (owners.length === 0) {
            ctx.status = 400;
            ctx.body = "Owners not found";
        } else {
            ctx.status = 200;
            ctx.body = owners;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getOwnerById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const owner = await Owner.findByPk(id);
        if (!owner) {
            ctx.status = 404;
            ctx.body = "Owner not found";
        } else {
            ctx.status = 200;
            ctx.body = owner;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteOwner = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedOwner = await Owner.destroy({
            where: {
                id: id,
            },
        });
        if (deletedOwner === 0) {
            ctx.status = 404;
            ctx.body = "Owner not found";
        } else {
            ctx.status = 200;
            ctx.body = "Owner deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateOwner = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { name, phone_number } = ctx.request.body;
        const [owner] = await Owner.update(
            { name, phone_number },
            {
                where: {
                    id: id,
                },
            }
        );
        if (owner === 0) {
            ctx.status = 404;
            ctx.body = "Owner not found";
        } else {
            const updatedOwner = await Owner.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedOwner;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllOwners,
    getOwnerById,
    addOwner,
    deleteOwner,
    updateOwner,
};
