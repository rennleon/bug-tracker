const { default: mongoose } = require("mongoose");

const { createRequest, createResponse } = require("../helpers/createReqRes");
const { generateUserList } = require("./utils");
const { getUserById } = require("../../src/controllers/userController");

const userStub = require("./userStub");

const { sendStatus, jsonHas } = require("../helpers/funcCommonTets.js")(
  getUserById
);

describe("getUserById", function () {
  const req = createRequest();
  const res = createResponse();

  const stub = userStub.findById;

  describe("empty DB", function () {
    before(() => stub.returns({ exec: () => null }));

    it(
      "should send forbidden status [403] on same id",
      sendStatus(403)({ ...req, params: { id: req.user.id } }, res)
    );

    it(
      "should send not found status [404]",
      sendStatus(404)(
        { ...req, params: { id: mongoose.Types.ObjectId() } },
        res
      )
    );
  });

  describe("DB with data", function () {
    let users = generateUserList(5);

    before(() => stub.returns({ exec: () => users[0] }));

    it(
      "should return a json object on valid user id",
      jsonHas([["_id"], ["user", users[0].user]])(
        { ...req, params: { id: users[0]._id } },
        res
      )
    );

    it(
      "should send not found status [404]",
      sendStatus(404)(
        { ...req, params: { id: mongoose.Types.ObjectId() } },
        res
      )
    );
  });
});
