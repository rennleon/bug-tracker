const express = require("express");
const router = express.Router();

const { verifyStaffId } = require("../middleware/verifyStaffId");
const controller = require("../controllers/staffTicketsController");

router.use(verifyStaffId);

router.get("/:staffId/tickets", controller.geSttaffTickets);
router.get("/:staffId/tickets/:id/take", controller.takeTicket);
router.get("/:staffId/tickets/:id/close", controller.closeTicket);

module.exports = router;
