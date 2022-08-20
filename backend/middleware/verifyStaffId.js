const { request, response } = require("express");
const User = require("../models/User");

const verifyStaffId = async (req = request, res = response, next) => {
  // VERIFY LATER AGAINST LOGGED IN USER WITH STAFF ROLE AND ID THE SAME AS "staffId"

  const staff = await User.findById(req.params.staffId).exec();
  if (!staff) return res.sendStatus(404);

  req.userId = staff._id;
  next();
};

module.exports = { verifyStaffId };
