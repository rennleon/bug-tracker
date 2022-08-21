const express = require("express");
const router = express.Router();

const USER_ROLES = require("../config/rolesConstants");

const verifyJWT = require("../middleware/verifyJWT");
const verifyUserExists = require("../middleware/verifyUserExists");
const roleAcess = require("../middleware/verifyRoleAccess");

const authRoutes = require("./authRoutes");

const profileRoutes = require("./profileRoutes");

const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const userTicketRoutes = require("./userTicketRoutes");
const staffTicketRoutes = require("./staffTicketRoutes");

// Public routes
router.use("/auth", authRoutes);

// Auth middleware
router.use(verifyJWT);

// Verify User Exists on DB
router.use(verifyUserExists);

/**
 * The following routes has request with user prop on it
 * req.user = { id, roles };
 */

// Protected routes by ROLE access
router.use("/users", roleAcess([USER_ROLES.ADMIN]), userRoutes);
router.use("/tickets", roleAcess([USER_ROLES.ADMIN]), ticketRoutes);

// Special routes
router.use(
  "/my-profile",
  roleAcess([USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.STAFF]),
  profileRoutes
);

// Mixed Routes
router.use("/user/my-tickets", roleAcess([USER_ROLES.USER]), userTicketRoutes);
router.use(
  "/staff/my-tickets",
  roleAcess([USER_ROLES.STAFF]),
  staffTicketRoutes
);

module.exports = router;
