const express = require("express");
const router = express.Router();

const { verifyUserId } = require("../middleware/verifyUserId");
const controller = require("../controllers/staffTicketsController");

router.get("/:userId/tickets", verifyUserId, controller.geSttaffTickets);
router.get("/:userId/tickets/:id/take", verifyUserId, controller.takeTicket);
router.get("/:userId/tickets/:id/close", verifyUserId, controller.closeTicket);

module.exports = router;
