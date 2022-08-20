const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const userTicketRoutes = require("./userTicketRoutes");
const staffTicketRoutes = require("./staffTicketRoutes");

router.use("/users", userRoutes);
router.use("/users", userTicketRoutes);
router.use("/staff", staffTicketRoutes);
router.use("/tickets", ticketRoutes);

module.exports = router;
