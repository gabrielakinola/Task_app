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
  name: "  Patricia   ",
  age: "27",
  email: "PATRICIA@gmail.com",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => {
    console.log("Error!", err);
  });

// const Task = mongoose.model("Tasks", {
//   description: {
//     type: String,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     required: true,
//   },
// });

// const me = new Task({
//   description: "House Cleaning",
//   completed: true,
// });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((err) => console.log("Error!", err));
