const { request, response } = require("express");

const { encrypt } = require("../utils/encrypt");

const User = require("../models/User");
const USER_ROLES = require("../config/rolesConstants");

const getAllowedRoles = (roles = [USER_ROLES.USER]) =>
  roles.filter((roleName) => !!USER_ROLES[roleName]);

const getAllUsers = async (req = request, res = response) => {
  try {
    const users = await User.find({}).exec();
    if (!users || users.length === 0) {
      return res.sendStatus(204);
    }
    res.json(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getUserById = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createUser = async (req = request, res = response) => {
  try {
    const { user, password, roles = [USER_ROLES.USER] } = req.body;
    if (!user?.trim() || !password?.trim())
      return res
        .status(400)
        .json({ message: "user and password are both required" });

    const foundUser = await User.findOne({ user }).exec();
    if (foundUser) return res.sendStatus(409);

    const encrypted = await encrypt(password);
    const allowedRoles = getAllowedRoles(roles);

    const newUser = await User.create({
      user,
      password: encrypted,
      roles: allowedRoles,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const foundUser = await User.findById(req.params.id).exec();
    if (!foundUser) return res.status(404).json({ message: "404 Not Found" });

    const { roles } = req.body;
    if (!roles) return res.status(400).json({ message: "received empty body" });

    if (roles) {
      foundUser.roles = getAllowedRoles(roles);
    }

    await foundUser.save();
    return res
      .status(200)
      .json({ message: `User ${foundUser.user} updated successfully` });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const foundUser = await User.findById(req.params.id).exec();
    if (!foundUser) return res.status(404).json({ message: "404 Not Found" });

    await foundUser.delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
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
