const express = require("express");
const router = express.Router();

const controller = require("../controllers/userTicketsController");
const {
  ticketValidator,
} = require("../middleware/validators/ticketValidators");

router
  .route("/")
  .get(controller.getUserTickets)
  .post(ticketValidator, controller.createUserTicket);

router
  .route("/:id")
  .get(controller.getUserTicketById)
  .put(ticketValidator, controller.updateUserTicket)
  .delete(controller.deleteUserTicket);

module.exports = router;
