const express = require("express");
const router = express.Router();

const { handleLogin } = require("../controllers/loginController");
const { handleLogout } = require("../controllers/logoutController");
const { handleRefreshToken } = require("../controllers/refreshTokenController");

router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh-token", handleRefreshToken);

module.exports = router;
