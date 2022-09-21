const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.send(e).status(500);
  }
});
//without async await
//   Task.find({})
//     .then((tasks) => {
//       res.send(tasks);
//     })
//     .catch((e) => {
//       res.status(500).send(e);
//     });
// });

router.get("/tasks/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["task", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: " Invalid Upadates!" });
  }
  try {
    const task = await Task.findById(req.params.id);
    // console.log(task);
    // console.log(updates);
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    //console.log(task);

    //const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    if (!task) {
      return res.status(400).send("No tasks matches that id");
    }
    res.send(task);
  } catch (e) {
    res.send(e).status(500);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  try {
    if (!task) {
      return res.status(404).send(`Task not found`);
    }
    res.send(task);
  } catch (e) {
    res.send(e).status(500);
  }
});

module.exports = router;
