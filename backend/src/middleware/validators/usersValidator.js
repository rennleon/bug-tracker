const validate = require("./validate");
const { body } = require("express-validator");
const USER_ROLES = require("../../config/rolesConstants");

const userCreateValidator = validate([
  body("user").trim().notEmpty().withMessage("user is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 chars long"),
]);

const userUpdateValidator = validate([
  body("roles")
    .notEmpty()
    .withMessage("roles is required")
    .isIn(Object.keys(USER_ROLES))
    .withMessage("invalid role"),
]);

module.exports = { userCreateValidator, userUpdateValidator };
