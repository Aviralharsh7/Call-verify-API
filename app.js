const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const {routeNotFound, errorHandler} = require("./middlewares");
const {corsOptions} = require("./config");

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", routes);

app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;