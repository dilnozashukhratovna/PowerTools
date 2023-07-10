const Router = require("koa-router");
const {
    getAllClients,
    getClientById,
    addClient,
    deleteClient,
} = require("../controllers/client.controller");

const router = new Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", addClient);
router.delete("/:id", deleteClient);

module.exports = () => router.routes();
