const { request, response } = require("express");
const Ticket = require("../models/Ticket");
const TICKET_STATUS = require("../config/ticketStatusConstants");

const getUserTickets = async (req = request, res = response) => {
  const { page = 1, limit = 10, status = "" } = req.query;
  const query = { userId: { $eq: req.user.id } };
  const options = { page, limit };

  if (status !== "") req.status = status;

  try {
    const tickets = await Ticket.paginate(query, options);
    if (!tickets || tickets.docs.length === 0) return res.sendStatus(204);

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getUserTicketById = async (req = request, res = response) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).exec();

    if (!ticket) {
      return res.sendStatus(404);
    }

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createUserTicket = async (req = request, res = response) => {
  try {
    const { content } = req.body;

    const newTicket = await Ticket.create({
      userId: req.user.id,
      content,
      status: TICKET_STATUS.UNASSIGNED,
    });
    res.status(201).json(newTicket);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateUserTicket = async (req = request, res = response) => {
  try {
    const foundTicket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).exec();
    if (!foundTicket) return res.sendStatus(404);

    const { content } = req.body;

    foundTicket.content = content;
    await foundTicket.save();
    res.status(200).json({
      message: `Ticket with id ${foundTicket._id} was updated successfully`,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const deleteUserTicket = async (req = request, res = response) => {
  try {
    const foundTicket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).exec();
    if (!foundTicket) return res.sendStatus(404);

    await foundTicket.delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getUserTickets,
  getUserTicketById,
  createUserTicket,
  updateUserTicket,
  deleteUserTicket,
};
