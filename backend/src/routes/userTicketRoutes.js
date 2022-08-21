const express = require("express");
const router = express.Router();

const controller = require("../controllers/userTicketsController");
const { verifyUserExists } = require("../middleware/verifyUserExists");

router.use(verifyUserExists);

router
  .route("/:userId/tickets")
  .get(controller.getUserTickets)
  .post(controller.createUserTicket);

router
  .route("/:userId/tickets/:id")
  .get(controller.getUserTicketById)
  .put(controller.updateUserTicket)
  .delete(controller.deleteUserTicket);

module.exports = router;
