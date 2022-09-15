require("../src/db/mongoose");

const Task = require("../src/models/task");

Task.findByIdAndDelete("630f3e844e7464927b8d8437")
  .then((result) => {
    console.log(result);
    return Task.countDocuments({ completed: true }).then((result2) => {
      console.log(result2);
    });
  })
  .catch((e) => {
    console.log(e);
  });
