require("../src/db/mongoose");

const Task = require("../src/models/task");
const { findByIdAndDelete } = require("../src/models/user");

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

const deleteTaskAndCount = async (id, completed) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed });
  return { deletedTask, count };
};

deleteTaskAndCount("630f3f455687f5dddb8572d5", true)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => console.log(e));
