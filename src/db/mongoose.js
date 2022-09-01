const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// const me = new User({
//   name: "Andrew",
//   age: "27",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log("Error!", err);
//   });

const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const me = new Task({
  description: "House Cleaning",
  completed: true,
});
me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => console.log("Error!", err));
