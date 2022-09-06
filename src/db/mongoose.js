const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Your password is not secure");
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

const me = new User({
  name: "  Touluwanimi   ",
  age: "27",
  email: "Tolu@gmail.com",
  password: "Wordpassni-01",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => {
    console.log("Error!", err);
  });

const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
  },
});

const nme = new Task({
  description: "House Cleaning",
  completed: true,
});
nme
  .save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => console.log("Error!", err));
