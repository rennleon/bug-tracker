const { request, response } = require("express");

const getAllUsers = (req = request, res = response) => {};
const getUserById = (req = request, res = response) => {};
const createUser = (req = request, res = response) => {};
const updateUser = (req = request, res = response) => {};
const deleteUser = (req = request, res = response) => {};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
