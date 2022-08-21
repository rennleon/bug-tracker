const USER_ROLES = require("../config/rolesConstants");

const getAllowedRoles = (roles = [USER_ROLES.USER]) =>
  roles.filter((roleName) => !!USER_ROLES[roleName]);

module.exports = { getAllowedRoles };
