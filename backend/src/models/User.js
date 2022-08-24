const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
