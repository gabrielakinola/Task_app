const express = require("express");
const app = express();
require("./db/mongoose");
const userRoute = require("./routers/user");
const taskRoute = require("./routers/task");
const { findById } = require("./models/user");
const { PromiseProvider } = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", userRoute);
app.use("/", taskRoute);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

//middleware for maintenance mode
// app.use((req, res, next) => {
//   if (req.method) {
//     res.send("Site is in maintenance mode!!! Try again soon");
//   } else {
//     next();
//   }
// });

// const bcrypt = require("bcrypt");

// const myFunction = async () => {
//   const password = "Red12345!";
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password, hashedPassword);

//   const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

//console.log(userRoute);

//console.log(express);

//json web tokens

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// myFunction();
