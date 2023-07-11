const Router = require("koa-router");
const {
    getAllShops,
    getShopById,
    addShop,
    deleteShop,
    updateShop,
} = require("../controllers/shop.controller");

const router = new Router();

router.get("/", getAllShops);
router.get("/:id", getShopById);
router.post("/", addShop);
router.delete("/:id", deleteShop);
router.put("/:id", updateShop);

module.exports = () => router.routes();
