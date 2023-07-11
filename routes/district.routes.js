const Router = require("koa-router");
const {
    getAllDistricts,
    getDistrictById,
    addDistrict,
    deleteDistrict,
    updateDistrict,
} = require("../controllers/district.controller");

const router = new Router();

router.get("/", getAllDistricts);
router.get("/:id", getDistrictById);
router.post("/", addDistrict);
router.delete("/:id", deleteDistrict);
router.put("/:id", updateDistrict);

module.exports = () => router.routes();
