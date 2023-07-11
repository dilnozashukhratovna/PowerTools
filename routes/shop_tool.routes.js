const Router = require("koa-router");
const {
    getAllShopTools,
    getShopToolById,
    addShopTool,
    deleteShopTool,
    updateShopTool,
} = require("../controllers/shop_tool.controller");

const router = new Router();

router.get("/", getAllShopTools);
router.get("/:id", getShopToolById);
router.post("/", addShopTool);
router.delete("/:id", deleteShopTool);
router.put("/:id", updateShopTool);

module.exports = () => router.routes();
