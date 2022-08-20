const express = require("express");
const router = express.Router();

const { verifyStaffId } = require("../middleware/verifyStaffId");
const controller = require("../controllers/staffTicketsController");

router.get("/:staffId/tickets", verifyStaffId, controller.geSttaffTickets);
router.get("/:staffId/tickets/:id/take", verifyStaffId, controller.takeTicket);
router.get(
  "/:staffId/tickets/:id/close",
  verifyStaffId,
  controller.closeTicket
);

module.exports = router;
