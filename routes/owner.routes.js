const Router = require("koa-router");
const {
    getAllOwners,
    getOwnerById,
    addOwner,
    deleteOwner,
    updateOwner,
} = require("../controllers/owner.controller");

const router = new Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.post("/", addOwner);
router.delete("/:id", deleteOwner);
router.put("/:id", updateOwner);

module.exports = () => router.routes();
