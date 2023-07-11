const Router = require("koa-router");
const {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    updateOrder,
} = require("../controllers/order.controller");

const router = new Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);

module.exports = () => router.routes();
