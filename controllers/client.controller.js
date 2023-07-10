const Client = require("../models/client");
const { ValidationError } = require("sequelize");

const addClient = async (ctx) => {
    try {
        const { name, phone_number, email } = ctx.request.body;
        const newClient = await Client.create({
            name,
            phone_number,
            email,
        });
        ctx.status = 201;
        ctx.body = newClient;
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

const getAllClients = async (ctx) => {
    try {
        const clients = await Client.findAll();
        if (clients.length === 0) {
            ctx.status = 400;
            ctx.body = "Clients not found";
        } else {
            ctx.status = 200;
            ctx.body = clients;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getClientById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const client = await Client.findByPk(id);
        if (!client) {
            ctx.status = 404;
            ctx.body = "Client not found";
        } else {
            ctx.status = 200;
            ctx.body = client;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteClient = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedClient = await Client.destroy({
            where: {
                id: id,
            },
        });
        if (deletedClient === 0) {
            ctx.status = 404;
            ctx.body = "Client not found";
        } else {
            ctx.status = 200;
            ctx.body = "Client deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};


module.exports = {
    getAllClients,
    getClientById,
    addClient,
    deleteClient,
};
