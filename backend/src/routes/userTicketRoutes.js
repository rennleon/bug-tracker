const express = require("express");
const router = express.Router();

const controller = require("../controllers/userTicketsController");

router
  .route("/")
  .get(controller.getUserTickets)
  .post(controller.createUserTicket);

router
  .route("/:id")
  .get(controller.getUserTicketById)
  .put(controller.updateUserTicket)
  .delete(controller.deleteUserTicket);

module.exports = router;
