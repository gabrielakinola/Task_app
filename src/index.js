const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
