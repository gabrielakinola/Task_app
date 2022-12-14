const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const { application } = require("express");
const sharp = require("sharp");

const router = express.Router();

//ROute to create a new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Route to login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
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
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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

// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(400).send("There is no user with that id");
//     }
//     res.send(user).status(200);
//   } catch (e) {
//     res.send(e).status(500);
//   }
// });

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
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: " Invalid Upadates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    //const user = await User.findByIdAndUpdate(req.params.id, req.body);

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Resource deleting endpoints
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send(`User not found!`);
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.send(e).status(500);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token === "";
    });

    await req.user.save();

    res.send("All users logged out");
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a picture"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  auth,
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 100, height: 100 })
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send("File updload succesful");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).send(req.user);
});

module.exports = router;

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});
