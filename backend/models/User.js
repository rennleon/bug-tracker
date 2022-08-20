const mongoose = require("schema");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [String],
});

module.exports = mongoose.model("User", userSchema);
