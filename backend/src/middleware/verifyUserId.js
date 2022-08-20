const { request, response } = require("express");
const User = require("../models/User");

const verifyUserId = async (req = request, res = response, next) => {
  // VERIFY LATER AGAINST LOGGED IN USER WITH user ROLE AND ID THE SAME AS "userId"

  try {
    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.sendStatus(404);

    req.userId = req.params.userId;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyUserId };
