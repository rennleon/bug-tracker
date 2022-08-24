const { request, response } = require("express");
const Ticket = require("../models/Ticket");
const TICKET_STATUS = require("../config/ticketStatusConstants");

const listUntakenTickets = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = req.query;
  const query = { status: TICKET_STATUS.UNASSIGNED };
  const options = { page, limit };

  try {
    const tickets = await Ticket.paginate(query, options);
    if (!tickets || tickets.docs.length === 0) return res.sendStatus(204);

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const geSttaffTickets = async (req = request, res = response) => {
  const { page = 1, limit = 10, status = "" } = req.query;
  const query = { staffId: { $eq: req.user.id } };
  const options = { page, limit };

  if (status !== "") query.status = status;

  try {
    const tickets = await Ticket.paginate(query, options);
    if (!tickets || tickets.docs.length === 0) return res.sendStatus(204);

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
  listUntakenTickets,
  geSttaffTickets,
  geSttaffTicketById,
  takeTicket,
  closeTicket,
};
