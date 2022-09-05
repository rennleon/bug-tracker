const { request, response } = require("express");

const { encrypt } = require("../utils/encrypt");

const User = require("../models/User");

const getAllUsers = async (req = request, res = response) => {
  const { page = 1, limit = 10, username = "" } = req.query;
  const regex = new RegExp(username, "i");
  const query = { _id: { $ne: req.user.id }, user: regex };
  const options = { page, limit };

  try {
    const users = await User.paginate(query, options);

    if (!users || users.docs.length === 0) {
      return res.sendStatus(204);
    }
    res.json(users);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getUserById = async (req = request, res = response) => {
  try {
    if (req.user.id === req.params.id) return res.sendStatus(403);

    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (err) {
    res.sendStatus(500);
  }
};

const createUser = async (req = request, res = response) => {
  try {
    const { user, password, roles } = req.body;

    const foundUser = await User.findOne({ user }).exec();
    if (foundUser) return res.sendStatus(409);

    const encrypted = await encrypt(password);

    const newUser = await User.create({
      user,
      roles,
      password: encrypted,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.sendStatus(500);
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    if (req.user.id === req.params.id) return res.sendStatus(403);

    const foundUser = await User.findById(req.params.id).exec();
    if (!foundUser) return res.sendStatus(404);

    foundUser.roles = allowedRoles;
    await foundUser.save();

    return res.status(200).json(foundUser);
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    if (req.user.id === req.params.id) return res.sendStatus(403);

    const foundUser = await User.findById(req.params.id).exec();
    if (!foundUser) return res.status(404).json({ message: "404 Not Found" });

    await foundUser.delete();
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
