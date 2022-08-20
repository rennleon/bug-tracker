const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const userTicketRoutes = require("./userTicketRoutes");

router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/users/:userId/tickets", userTicketRoutes);

module.exports = router;
