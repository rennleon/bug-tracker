const { request, response } = require("express");

const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokens");
const { matchEncrypt } = require("../utils/encrypt");
const JWT_REFRESH_COOKIE = require("../config/jwtCookie");

const handleLogin = async (req = request, res = response) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "user and password are required" });

  const foundUser = await User.findOne({ user }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await matchEncrypt(password, foundUser.password);
  if (!match) return res.sendStatus(401);

  const accessToken = generateAccessToken(foundUser);
  const refreshToken = generateRefreshToken(foundUser);

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie(JWT_REFRESH_COOKIE.name, refreshToken, JWT_REFRESH_COOKIE.options);
  res.json({ accessToken });
};

module.exports = { handleLogin };
