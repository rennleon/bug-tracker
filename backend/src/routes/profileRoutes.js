const express = require("express");
const router = express.Router();

const controller = require("../controllers/profileController");

router.route("/").get(controller.getProfileInfo).put(controller.updateProfile);

module.exports = router;
