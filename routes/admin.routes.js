const Router = require("koa-router");
const {
    getAllAdmins,
    getAdminById,
    addAdmin,
    deleteAdmin,
    updateAdmin,
} = require("../controllers/admin.controller");

const router = new Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/", addAdmin);
router.delete("/:id", deleteAdmin);
router.put("/:id", updateAdmin);

module.exports = () => router.routes();
