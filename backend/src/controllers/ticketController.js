const { request, response } = require("express");
const Ticket = require("../models/Ticket");

const getAllTickets = async (req = request, res = response) => {
  const { page = 1, limit = 10, status = "", content = "" } = req.query;
  const regex = new RegExp(content, "i");
  const query = { content: regex };
  const options = { page, limit };

  if (status !== "") query.status = status;

  try {
    const tickets = await Ticket.paginate(query, options);
    if (!tickets || tickets.docs.length === 0) {
      return res.sendStatus(204);
    }
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getTicketById = async (req = request, res = response) => {
  try {
    const ticket = await Ticket.findById(req.params.id).exec();
    if (!ticket) {
      return res.sendStatus(404);
    }
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
};
