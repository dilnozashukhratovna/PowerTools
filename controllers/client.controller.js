const Client = require("../models/client");
const getClients = (ctx) => {};

const getClientById = (ctx) => {};

const addClient = async (ctx) => {
    try {
        const { client_name, client_phone_number } = ctx.request.body;
        const newClient = await Client.create({
            client_name,
            client_phone_number,
        });
        ctx.status = 201;
        ctx.body = newClient;
    } catch (error) {
        ctx.status = 500
        ctx.body = "Serverda xatolik"
    }
};

module.exports = {
    getClients,
    getClientById,
    addClient,
};
