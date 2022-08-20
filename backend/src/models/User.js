const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: false,
    default: "",
  },
  roles: {
    type: [String],
    default: ["USER"],
  },
});

module.exports = mongoose.model("User", userSchema);
