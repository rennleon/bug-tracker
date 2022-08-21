const express = require("express");
const router = express.Router();

const controller = require("../controllers/staffTicketsController");

router.get("/my-tickets", controller.geSttaffTickets);
router.get("/my-tickets/:id", controller.geSttaffTicketById);
router.get("/my-tickets/:id/take", controller.takeTicket);
router.get("/my-tickets/:id/close", controller.closeTicket);

module.exports = router;
