const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  staffId: {
    type: mongoose.Types.ObjectId,
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
    default: new Date().toISOString(),
  },
  closedAt: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
