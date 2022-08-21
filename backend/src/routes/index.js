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
router.use("/users", userRoutes); // access by ADMIN
router.use("/users", userTicketRoutes); // access by USER
router.use("/staff", staffTicketRoutes); // access by STAFF
router.use("/tickets", ticketRoutes); // access by USER

module.exports = router;
