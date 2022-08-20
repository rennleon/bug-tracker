const { request, response } = require("express");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

const getUserTickets = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.sendStatus(404);

    const tickets = await Ticket.find({ userId: user._id }).exec();
    if (!tickets || tickets.length === 0) return res.sendStatus(204);

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getUserTicketById = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.sendStatus(404);

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      userId: user._id,
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
    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.sendStatus(404);

    const { content } = req.body;
    if (!content?.trim())
      return res.status(400).json({ message: "content is required" });

    const newTicket = await Ticket.create({
      userId: user._id,
      content,
    });
    res.status(201).json(newTicket);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateUserTicket = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.sendStatus(404);

    const foundTicket = await Ticket.findOne({
      _id: req.params.id,
      userId: user._id,
    }).exec();
    if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

    if (!req.body?.content)
      return res.status(400).json({ message: "content is required" });

    foundTicket.content = req.body.content;
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
    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.sendStatus(404);

    const foundTicket = await Ticket.find({
      _id: req.params.id,
      userId: user._id,
    }).exec();
    if (!foundTicket) return res.status(404).json({ message: "404 Not Found" });

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
