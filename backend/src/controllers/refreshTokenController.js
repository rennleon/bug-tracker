const { request, response } = require("express");
const JWT_REFRESH_COOKIE = require("../config/jwtCookie");
const User = require("../models/User");
const { generateAccessToken, verifyRefreshToken } = require("../utils/tokens");

const handleRefreshToken = async (req = request, res = response) => {
  const cookies = req.cookies;
  if (!cookies || !cookies[JWT_REFRESH_COOKIE.name]) return res.sendStatus(401);

  try {
    const refreshToken = cookies[JWT_REFRESH_COOKIE.name];
    const { user: userId } = await verifyRefreshToken(refreshToken);

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser || `${foundUser._id}` !== userId) return res.sendStatus(401);

    const accessToken = generateAccessToken(foundUser);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = { handleRefreshToken };
