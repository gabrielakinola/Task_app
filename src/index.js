const express = require("express");
const app = express();
require("./db/mongoose");
const userRoute = require("./routers/user");
const taskRoute = require("./routers/task");
const { findById } = require("./models/user");
const { PromiseProvider } = require("mongoose");
const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = multer({
  dest: "images",
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

app.use(express.json());
app.use("/", userRoute);
app.use("/", taskRoute);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
