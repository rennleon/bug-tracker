const express = require("express");
const router = express.Router();

const USER_ROLES = require("../config/rolesConstants");

const verifyJWT = require("../middleware/verifyJWT");
const roleAcess = require("../middleware/verifyRoleAccess");

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
router.use("/users", roleAcess([USER_ROLES.ADMIN]), userRoutes); // access by ADMIN
router.use("/tickets", roleAcess([USER_ROLES.ADMIN]), ticketRoutes); // access by USER

// Mixed Routes
router.use("/users", roleAcess([USER_ROLES.USER]), userTicketRoutes); // access by USER
router.use("/staff", roleAcess([USER_ROLES.STAFF]), staffTicketRoutes); // access by STAFF

module.exports = router;
