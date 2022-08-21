const express = require("express");
const router = express.Router();

const controller = require("../controllers/ticketController");

router.get("/", controller.getAllTickets);
router.get("/:id", controller.getTicketById);

module.exports = router;
