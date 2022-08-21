const express = require("express");
const router = express.Router();

const verifyUserIdAccess = require("../middleware/verifyUserIdAccess");
const controller = require("../controllers/userTicketsController");

router
  .route("/:userId/tickets")
  .get(verifyUserIdAccess, controller.getUserTickets)
  .post(verifyUserIdAccess, controller.createUserTicket);

router
  .route("/:userId/tickets/:id")
  .get(verifyUserIdAccess, controller.getUserTicketById)
  .put(verifyUserIdAccess, controller.updateUserTicket)
  .delete(verifyUserIdAccess, controller.deleteUserTicket);

module.exports = router;
