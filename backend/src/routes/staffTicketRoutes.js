const express = require("express");
const router = express.Router();

const verifyUserExists = require("../middleware/verifyUserExists");
const controller = require("../controllers/staffTicketsController");

router.use(verifyUserExists);

router.get("/:userId/tickets", controller.geSttaffTickets);
router.get("/:userId/tickets/:id/take", controller.takeTicket);
router.get("/:userId/tickets/:id/close", controller.closeTicket);

module.exports = router;
