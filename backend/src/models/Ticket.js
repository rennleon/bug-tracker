const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

ticketSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Ticket", ticketSchema);
