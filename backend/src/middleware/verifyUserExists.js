const { request, response } = require("express");
const JWT_REFRESH_COOKIE = require("../config/jwtCookie");
const User = require("../models/User");

const verifyUserExists = async (req = request, res = response, next) => {
  try {
    const foundUser = await User.findById(req.user.id).exec();
    if (!foundUser) {
      res.clearCookie(JWT_REFRESH_COOKIE.name, JWT_REFRESH_COOKIE.options);
      return res.sendStatus(404);
    }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = verifyUserExists;
