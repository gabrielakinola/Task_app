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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Task;
