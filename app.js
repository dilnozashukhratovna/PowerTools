const Koa = require("koa");
const config = require("config");
const bodyParser = require("koa-bodyparser");
const router = require("./routes/index.routes");
const cors = require("@koa/cors");
const serve = require("koa-static");
const PORT = config.get("port") || 3030;
const sequelize = require("./config/db");
const Client = require("./models/client");

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(serve("."));
app.use(router());

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true }); //await sequelize.sync({force:true})
        console.log("Connection has been established successfully.");
        app.listen(PORT, () => {
            console.log(`Server ${PORT}-portda ishga tushdi`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
