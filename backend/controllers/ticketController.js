const { request, response } = require("express");
const Ticket = require("../models/Ticket");

const getAllTickets = async (req = request, res = response) => {
  const tickets = await Ticket.find({}).exec();
  if (!tickets || tickets.length === 0) {
    return res.sendStatus(204);
  }
  res.json(tickets);
};

const getTicketById = async (req = request, res = response) => {
  const ticket = await Ticket.findById(req.params.id).exec();
  if (!ticket) {
    return res.sendStatus(404);
  }
  res.json(ticket);
};

const createTicket = async (req = request, res = response) => {
  const { userId, content } = req.body;
  if (!userId?.trim() || !content?.trim())
    return res
      .status(400)
      .json({ message: "userId and content are both required" });

  try {
    const newTicket = await Ticket.create({
      userId,
      content,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json(err.message);
  }
};

const updateTicket = async (req = request, res = response) => {
  const foundTicket = await Ticket.findById(req.params.id).exec();
  if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

  if (req.body.content) {
    foundTicket.content = content;
    await foundTicket.save();
    return res.status(200).json({
      message: `Ticket with id ${foundTicket._id} was updated successfully`,
    });
  }

  res.sendStatus(204);
};

const deleteTicket = async (req = request, res = response) => {
  const foundTicket = await Ticket.findById(req.params.id).exec();
  if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

  await foundTicket.delete();
  res.sendStatus(204);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
