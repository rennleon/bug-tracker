const { request, response } = require("express");
const User = require("../models/User");

const verifyUserExists = async (req = request, res = response, next) => {
  try {
    const user = await User.findById(req.user.id).exec();
    if (!user) return res.sendStatus(404);
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyUserExists };
