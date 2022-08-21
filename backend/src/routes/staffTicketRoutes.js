const express = require("express");
const router = express.Router();

const verifyUserIdAccess = require("../middleware/verifyUserIdAccess");
const controller = require("../controllers/staffTicketsController");

router.get("/:userId/tickets", verifyUserIdAccess, controller.geSttaffTickets);
router.get(
  "/:userId/tickets/:id/take",
  verifyUserIdAccess,
  controller.takeTicket
);
router.get(
  "/:userId/tickets/:id/close",
  verifyUserIdAccess,
  controller.closeTicket
);

module.exports = router;
