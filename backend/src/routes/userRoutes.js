const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const validators = require("../middleware/validators/userValidators");

router
  .route("/")
  .get(controller.getAllUsers)
  .post(validators.userCreateValidator, controller.createUser);

router
  .route("/:id")
  .get(controller.getUserById)
  .put(validators.userUpdateValidator, controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;
