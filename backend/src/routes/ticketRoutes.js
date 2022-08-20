const express = require("express");
const router = express.Router();

const controller = require("../controllers/ticketController");

router.route("/").get(controller.getAllTickets).post(controller.createTicket);

router
  .route("/:id")
  .get(controller.getTicketById)
  .put(controller.updateTicket)
  .delete(controller.deleteTicket);

module.exports = router;
