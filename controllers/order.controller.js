const Order = require("../models/order");
const { ValidationError } = require("sequelize");

const addOrder = async (ctx) => {
    try {
        const { order_date, period, total_price, clientId, shopToolId } =
            ctx.request.body;
        const newOrder = await Order.create({
            order_date,
            period,
            total_price,
            clientId,
            shopToolId,
        });
        ctx.status = 201;
        ctx.body = newOrder;
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

const getAllOrders = async (ctx) => {
    try {
        const orders = await Order.findAll();
        if (orders.length === 0) {
            ctx.status = 400;
            ctx.body = "Orders not found";
        } else {
            ctx.status = 200;
            ctx.body = orders;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getOrderById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const order = await Order.findByPk(id);
        if (!order) {
            ctx.status = 404;
            ctx.body = "Order not found";
        } else {
            ctx.status = 200;
            ctx.body = order;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteOrder = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedOrder = await Order.destroy({
            where: {
                id: id,
            },
        });
        if (deletedOrder === 0) {
            ctx.status = 404;
            ctx.body = "Order not found";
        } else {
            ctx.status = 200;
            ctx.body = "Order deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateOrder = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { order_date, period, total_price, clientId, shopToolId } =
            ctx.request.body;
        const [order] = await Order.update(
            { order_date, period, total_price, clientId, shopToolId },
            {
                where: {
                    id: id,
                },
            }
        );
        if (order === 0) {
            ctx.status = 404;
            ctx.body = "Order not found";
        } else {
            const updatedOrder = await Order.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedOrder;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    updateOrder,
};
