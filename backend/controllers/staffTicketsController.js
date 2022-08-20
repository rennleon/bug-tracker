const { request, response } = require("express");
const Ticket = require("../models/Ticket");
const TICKET_STATUS = require("../config/ticketStatusConstants");

const geSttaffTickets = async (req = request, res = response) => {
  const tickets = await Ticket.find({ staffId: req.userId }).exec();
  if (!tickets || tickets.length === 0) return res.sendStatus(204);

  res.json(tickets);
};

const takeTicket = async (req = request, res = response) => {
  const foundTicket = await Ticket.findOne({
    _id: req.params.id,
    userId: req.userId,
  }).exec();
  if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

  if (foundTicket.status !== TICKET_STATUS.UNASSIGNED)
    return res.sendStatus(409);

  foundTicket.staffId = userId;
  foundTicket.status = TICKET_STATUS.ASSIGNED;
  await foundTicket.save();

  res.sendStatus(200);
};

const closeTicket = async (req = request, res = response) => {
  const foundTicket = await Ticket.findOne({
    _id: req.params.id,
    userId: req.userId,
  }).exec();
  if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

  if (foundTicket.status !== TICKET_STATUS.ASSIGNED) return res.sendStatus(409);

  foundTicket.status = TICKET_STATUS.CLOSED;
  foundTicket.closedAt = new Date().toISOString();
  await foundTicket.save();

  res.json(ticket);
};

module.exports = {
  geSttaffTickets,
  takeTicket,
  closeTicket,
};
