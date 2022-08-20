const express = require("express");
const router = express.Router();

const {
  getUserTickets,
  getUserTicketById,
  createUserTicket,
  updateUserTicket,
  deleteUserTicket,
} = require("../controllers/userTicketsController");

router.route("/:userId/tickets").get(getUserTickets).post(createUserTicket);

router
  .route("/:userId/tickets/:id")
  .get(getUserTicketById)
  .put(updateUserTicket)
  .delete(deleteUserTicket);

module.exports = router;
