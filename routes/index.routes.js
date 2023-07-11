const Router = require("koa-router");

const router = new Router();

const clientRouter = require("./client.routes");
const shopRouter = require("./shop.routes");
const ownerRouter = require("./owner.routes");
const shop_toolRouter = require("./shop_tool.routes");
const orderRouter = require("./order.routes");
const toolRouter = require("./tool.routes");



router.use("/api/client", clientRouter());
router.use("/api/shop", shopRouter());
router.use("/api/owner", ownerRouter());
router.use("/api/shop_tool", shop_toolRouter());
router.use("/api/order", orderRouter());
router.use("/api/tool", toolRouter());




module.exports = () => router.routes();
