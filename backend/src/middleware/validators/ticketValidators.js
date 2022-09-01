const validate = require("./validate");
const { body } = require("express-validator");

const ticketValidator = validate([
  body("content").trim().notEmpty().withMessage("content is required").escape(),
]);

module.exports = { ticketValidator };
