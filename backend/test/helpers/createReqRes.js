const mongoose = require("mongoose");
const sinon = require("sinon");

const createRequest = () => ({
  query: {},
  params: {},
  body: {},
  user: { id: mongoose.Types.ObjectId(), roles: ["ADMIN"] },
});

const createResponse = () => {
  const res = {
    json: sinon.spy(),
    send: sinon.spy(),
    sendStatus: sinon.spy(),
    status: sinon.spy({ status: () => res }, "status"),
  };

  return res;
};

module.exports = { createRequest, createResponse };
