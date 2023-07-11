const Router = require("koa-router");
const {
    getAllClients,
    getClientById,
    addClient,
    deleteClient,
    updateClient,
} = require("../controllers/client.controller");

const router = new Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", addClient);
router.delete("/:id", deleteClient);
router.put("/:id", updateClient);


module.exports = () => router.routes();
