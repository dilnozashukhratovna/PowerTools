const Router = require("koa-router");
const {
    getAllTools,
    getToolById,
    addTool,
    deleteTool,
    updateTool,
} = require("../controllers/tool.controller");

const router = new Router();

router.get("/", getAllTools);
router.get("/:id", getToolById);
router.post("/", addTool);
router.delete("/:id", deleteTool);
router.put("/:id", updateTool);

module.exports = () => router.routes();
