const { request, response } = require("express");
const JWT_REFRESH_COOKIE = require("../config/jwtCookie");
const { verifyAccessToken, verifyRefreshToken } = require("../utils/tokens");

const verifyJWT = async (req = request, res = response, next) => {
  const cookies = req.cookies;
  if (!cookies || !cookies[JWT_REFRESH_COOKIE.name]) return res.sendStatus(401);

  const authHeaders = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeaders?.startsWith("Bearer ")) return res.sendStatus(401);

  try {
    const accessToken = authHeaders.split(" ")[1];
    const refreshToken = cookies[JWT_REFRESH_COOKIE.name];
    const { user, roles } = await verifyAccessToken(accessToken);
    const { user: userId } = await verifyRefreshToken(refreshToken);

    if (user !== userId) return res.sendStatus(401);

    // inject token info in request
    req.user = {
      id: userId,
      roles,
    };

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = verifyJWT;
