const express = require("express");
const User = require("../models/user");

const router = express.Router();

//ROute to create a new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Without async await
//   user
//     .save()
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });

//Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

//Without async await
//   User.find({})
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((e) => {
//       res.status(500).send(e);
//     });
// });

router.get("/users/:id", async (req, res) => {
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

// without async await
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

//Resource Creating Endpoints
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: " Invalid Upadates!" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    //const user = await User.findByIdAndUpdate(req.params.id, req.body);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Resource deleting endpoints
router.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  try {
    if (!user) {
      return res.status(404).send(`User not found!`);
    }
    res.send(user);
  } catch (e) {
    res.send(e).status(500);
  }
});

module.exports = router;
