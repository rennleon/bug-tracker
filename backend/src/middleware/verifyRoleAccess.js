const { request, response } = require("express");

const verifyRoleAccess =
  (authorizedRoles = []) =>
  (req = request, res = response, next) => {
    const haveAccess = req.user.roles.some((role) =>
      authorizedRoles.includes(role)
    );
    if (!haveAccess) return res.sendStatus(401);

    next();
  };

module.exports = verifyRoleAccess;
