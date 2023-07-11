const District = require("../models/district");
const { ValidationError } = require("sequelize");

const addDistrict = async (ctx) => {
    try {
        const { name } =
            ctx.request.body;
        const newDistrict = await District.create({
            name,
        });
        ctx.status = 201;
        ctx.body = newDistrict;
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

const getAllDistricts = async (ctx) => {
    try {
        const districts = await District.findAll();
        if (districts.length === 0) {
            ctx.status = 400;
            ctx.body = "Districts not found";
        } else {
            ctx.status = 200;
            ctx.body = districts;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getDistrictById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const district = await District.findByPk(id);
        if (!district) {
            ctx.status = 404;
            ctx.body = "District not found";
        } else {
            ctx.status = 200;
            ctx.body = district;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteDistrict = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedDistrict = await District.destroy({
            where: {
                id: id,
            },
        });
        if (deletedDistrict === 0) {
            ctx.status = 404;
            ctx.body = "District not found";
        } else {
            ctx.status = 200;
            ctx.body = "District deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateDistrict = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { name } =
            ctx.request.body;
        const [district] = await District.update(
            { name },
            {
                where: {
                    id: id,
                },
            }
        );
        if (district === 0) {
            ctx.status = 404;
            ctx.body = "District not found";
        } else {
            const updatedDistrict = await District.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedDistrict;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllDistricts,
    getDistrictById,
    addDistrict,
    deleteDistrict,
    updateDistrict,
};
