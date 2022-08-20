const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId(),
    required: true,
  },
  staff: {
    type: mongoose.Types.ObjectId(),
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "UNASSIGNED", // ASSIGNED | UNASSIGNED | CLOSED
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
