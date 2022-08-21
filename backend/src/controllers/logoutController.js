const { request, response } = require("express");
const JWT_REFRESH_COOKIE = require("../config/jwtCookie");
const User = require("../models/User");

const handleLogout = async (req = request, res = response) => {
  const cookies = req.cookies;
  if (!cookies || !cookies[JWT_REFRESH_COOKIE.name]) return res.sendStatus(204);

  try {
    const refreshToken = cookies[JWT_REFRESH_COOKIE.name];
    // Remove refreshToken from user
    await User.updateOne({ refreshToken }, { refreshToken: "" }).exec();
  } catch (err) {
    console.error(err);
  } finally {
    res.clearCookie(JWT_REFRESH_COOKIE.name, JWT_REFRESH_COOKIE.options);
    res.sendStatus(204);
  }
};

module.exports = { handleLogout };
