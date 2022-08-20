const { request, response } = require("express");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/tokens");

const handleRefreshToken = async (req = request, res = response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  try {
    const refreshToken = cookies.jwt;
    const { user: userId } = await verifyRefreshToken(refreshToken);

    const foundUser = await User.findById({ userId }).exec();
    if (!foundUser) return res.sendStatus(401);

    const accessToken = generateAccessToken(foundUser);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = { handleRefreshToken };
