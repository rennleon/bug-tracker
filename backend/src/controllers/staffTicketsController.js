const { request, response } = require("express");
const Ticket = require("../models/Ticket");
const TICKET_STATUS = require("../config/ticketStatusConstants");

const geSttaffTickets = async (req = request, res = response) => {
  try {
    const tickets = await Ticket.find({ staffId: req.user.id }).exec();
    if (!tickets || tickets.length === 0) return res.sendStatus(204);

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const geSttaffTicketById = async (req = request, res = response) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      staffId: req.user.id,
    }).exec();
    if (!ticket) return res.sendStatus(404);

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const takeTicket = async (req = request, res = response) => {
  try {
    const foundTicket = await Ticket.findById(req.params.id).exec();
    if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

    if (foundTicket.status !== TICKET_STATUS.UNASSIGNED)
      return res.sendStatus(409);

    foundTicket.staffId = req.user.id;
    foundTicket.status = TICKET_STATUS.ASSIGNED;
    await foundTicket.save();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const closeTicket = async (req = request, res = response) => {
  try {
    const foundTicket = await Ticket.findOne({
      _id: req.params.id,
      staffId: req.user.id,
    }).exec();
    if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

    if (foundTicket.status !== TICKET_STATUS.ASSIGNED)
      return res.sendStatus(409);

    foundTicket.status = TICKET_STATUS.CLOSED;
    foundTicket.closedAt = new Date().toISOString();
    await foundTicket.save();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  geSttaffTickets,
  geSttaffTicketById,
  takeTicket,
  closeTicket,
};
