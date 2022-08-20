const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId(),
    required: true,
  },
  ticket: {
    type: mongoose.Types.ObjectId(),
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
