const Router = require("koa-router");
const {
    getClients,
    getClientById,
    addClient,
} = require("../controllers/client.controller");

const router = new Router();

router.get("/", getClients);
router.get("/:id", getClientById);
router.post("/", addClient);

module.exports = () => router.routes();
