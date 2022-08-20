const { request, response } = require("express");
const { verifyAccessToken } = require("../utils/tokens");

const verifyJWT = async (req = request, res = response, next) => {
  const authHeaders = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeaders?.startsWith("Bearer ")) return res.sendStatus(401);

  try {
    const accessToken = authHeaders.split(" ")[1];
    const { user: userId, roles } = await verifyAccessToken(accessToken);

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
