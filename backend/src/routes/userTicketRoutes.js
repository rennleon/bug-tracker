const express = require("express");
const router = express.Router();

const controller = require("../controllers/userTicketsController");

router
  .route("/my-tickets")
  .get(controller.getUserTickets)
  .post(controller.createUserTicket);

router
  .route("/my-tickets/:id")
  .get(controller.getUserTicketById)
  .put(controller.updateUserTicket)
  .delete(controller.deleteUserTicket);

module.exports = router;
