const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.send(task).status(200);
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

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
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

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
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

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["task", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: " Invalid Upadates!" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send("No tasks matches that id");
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send(`Task not found`);
    }
    res.send(task);
  } catch (e) {
    res.send(e).status(500);
  }
});

module.exports = router;
