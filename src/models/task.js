const mongoose = require("mongoose");

const Task = mongoose.model("task", {
  task: {
    type: String,
    required: true,
    trim: true,
  },

  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = Task;
