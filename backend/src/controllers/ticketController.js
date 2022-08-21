const { request, response } = require("express");
const Ticket = require("../models/Ticket");

const getAllTickets = async (req = request, res = response) => {
  try {
    const tickets = await Ticket.find({}).exec();
    if (!tickets || tickets.length === 0) {
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
