const express = require("express");
const router = express.Router();

const controller = require("../controllers/profileController");

router.get("/", controller.getProfileInfo);
router.put(controller.updateProfile);

module.exports = router;
