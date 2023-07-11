const Shop = require("../models/shop");
const Tool = require("../models/tool");
const { ValidationError } = require("sequelize");

const addTool = async (ctx) => {
    try {
        const { name, brand, description } = ctx.request.body;
        const newTool = await Tool.create({
            name,
            brand,
            description,
        });
        ctx.status = 201;
        ctx.body = newTool;
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

const getAllTools = async (ctx) => {
    try {
        const tools = await Tool.findAll({include: Shop});
        if (tools.length === 0) {
            ctx.status = 400;
            ctx.body = "Tools not found";
        } else {
            ctx.status = 200;
            ctx.body = tools;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getToolById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const tool = await Tool.findByPk(id);
        if (!tool) {
            ctx.status = 404;
            ctx.body = "Tool not found";
        } else {
            ctx.status = 200;
            ctx.body = tool;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteTool = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedTool = await Tool.destroy({
            where: {
                id: id,
            },
        });
        if (deletedTool === 0) {
            ctx.status = 404;
            ctx.body = "Tool not found";
        } else {
            ctx.status = 200;
            ctx.body = "Tool deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateTool = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { name, brand, description } = ctx.request.body;
        const [tool] = await Tool.update(
            { name, brand, description },
            {
                where: {
                    id: id,
                },
            }
        );
        if (tool === 0) {
            ctx.status = 404;
            ctx.body = "Tool not found";
        } else {
            const updatedTool = await Tool.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedTool;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllTools,
    getToolById,
    addTool,
    deleteTool,
    updateTool,
};
