const express = require("express");
const router = express.Router();

const controller = require("../controllers/userTicketsController");
const { verifyUserId } = require("../middleware/verifyUserId");

router
  .route("/:userId/tickets")
  .get(verifyUserId, controller.getUserTickets)
  .post(verifyUserId, controller.createUserTicket);

router
  .route("/:userId/tickets/:id")
  .get(verifyUserId, controller.getUserTicketById)
  .put(verifyUserId, controller.updateUserTicket)
  .delete(verifyUserId, controller.deleteUserTicket);

module.exports = router;
