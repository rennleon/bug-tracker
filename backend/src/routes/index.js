const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

const authRoutes = require("./authRoutes");

const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const userTicketRoutes = require("./userTicketRoutes");
const staffTicketRoutes = require("./staffTicketRoutes");

// Public routes
router.use("/auth", authRoutes);

// Auth middleware
router.use(verifyJWT);

/**
 * The following routes has request with user prop on it
 *
 * req.user = {
 *  id: userId,
 *  roles,
 * };
 */

// Protected routes
// PENDING: VERIFY ROLES ...
router.use("/users", userRoutes);
router.use("/users", userTicketRoutes);
router.use("/staff", staffTicketRoutes);
router.use("/tickets", ticketRoutes);

module.exports = router;
