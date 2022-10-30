const express = require("express");
const app = express();
require("./db/mongoose");
const userRoute = require("./routers/user");
const taskRoute = require("./routers/task");

app.use(express.json());
app.use("/", userRoute);
app.use("/", taskRoute);

module.exports = app;
