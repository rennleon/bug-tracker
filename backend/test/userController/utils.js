const { default: mongoose } = require("mongoose");

const generateUserList = (count = 1) =>
  Array(count)
    .fill(null)
    .map(() => ({
      _id: mongoose.Types.ObjectId(),
      user: "test-user",
      password: "12345",
      roles: ["USER"],
    }));

module.exports = { generateUserList };
