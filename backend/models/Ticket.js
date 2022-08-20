const mongoose = require("schema");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId(),
    required: true,
  },
  staff: {
    type: mongoose.Types.ObjectId(),
    required: false,
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
