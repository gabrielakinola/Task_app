const express = require("express");
const app = express();
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { findById } = require("./models/user");
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   user
//     .save()
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });

app.post("/tasks", async (req, res) => {
  const user = new Task(req.body);

  try {
    await user.save();
    res.send(user).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

//   user
//     .save()
//     .then((task) => {
//       res.send(task);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});
//   User.find({})
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((e) => {
//       res.status(500).send(e);
//     });
// });

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send("There is no user with that id");
    }
    res.send(user).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});
//   User.findById(_id)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send();
//       }
//       res.send(user);
//     })
//     .catch((e) => {
//       res.status(500).send(e);
//     });
// });

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.send(e).status(500);
  }
});

//   Task.find({})
//     .then((tasks) => {
//       res.send(tasks);
//     })
//     .catch((e) => {
//       res.status(500).send(e);
//     });
// });

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.send("There is no task with that id").status(500);
    }
    res.send(task);
  } catch (e) {
    res.send(e).status(500);
  }
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
