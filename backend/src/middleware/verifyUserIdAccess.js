const { request, response } = require("express");

const verifyUserIdAccess = (req = request, res = response, next) => {
  // Verify a logged in user can only access its same ID
  if (req.params.userId !== req.user.id) return res.sendStatus(401);

  next();
};

module.exports = verifyUserIdAccess;
