const { request, response } = require("express");
const User = require("../models/User");
const { encrypt } = require("../utils/encrypt");

const getProfileInfo = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.user.id).exec();
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateProfile = async (req = request, res = response) => {
  try {
    const foundUser = await User.findById(req.user.id).exec();
    if (!foundUser) return res.sendStatus(404);

    const { user, password } = req.body;
    if (!user?.trim() && !password?.trim())
      return res
        .status(400)
        .json({ message: "either user, password or roles should be set" });

    if (user) {
      foundUser.user = user.trim();
    }

    if (password) {
      const encrypted = await encrypt(password.trim());
      foundUser.password = encrypted;
    }

    await foundUser.save();

    return res
      .status(200)
      .json({ message: `User ${foundUser.user} updated successfully` });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getProfileInfo,
  updateProfile,
};
