const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

const loginRoutes = require("./loginRoutes");
const refreshTokenRoutes = require("./refreshTokenRoutes");

const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const userTicketRoutes = require("./userTicketRoutes");
const staffTicketRoutes = require("./staffTicketRoutes");

// Public routes
router.use("/login", loginRoutes);
router.use("/refresh-token", refreshTokenRoutes);

// Auth middleware
router.use(verifyJWT);

// Protected routes
// PENDING: VERIFY ROLES ...
router.use("/users", userRoutes);
router.use("/users", userTicketRoutes);
router.use("/staff", staffTicketRoutes);
router.use("/tickets", ticketRoutes);

module.exports = router;
