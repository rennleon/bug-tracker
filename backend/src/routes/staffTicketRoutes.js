const express = require("express");
const router = express.Router();

const controller = require("../controllers/staffTicketsController");

router.get("/", controller.geSttaffTickets);
router.get("/:id", controller.geSttaffTicketById);
router.get("/:id/take", controller.takeTicket);
router.get("/:id/close", controller.closeTicket);

module.exports = router;
