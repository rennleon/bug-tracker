const { getAllUsers } = require("../../src/controllers/userController");
const { createRequest, createResponse } = require("../helpers/createReqRes");

const { generateUserList } = require("./utils");

const userStub = require("./userStub");

const { sendStatus, arrayWithLength, arrayObjectsHas } =
  require("../helpers/funcCommonTets.js")(getAllUsers);

describe("getAllUsers", function () {
  const req = createRequest();
  const res = createResponse();

  const stub = userStub.paginate;

  describe("empty DB", function () {
    before(() => stub.returns({ docs: [] }));

    it("should send empty content [204]", sendStatus(204)(req, res));
    it("should send server error [500]", sendStatus(500)({}, res));
  });

  describe("DB with data", function () {
    let users = generateUserList(5);

    before(() => stub.returns({ docs: users }));

    it(
      `should return a json object with an array of ${users.length} users`,
      arrayWithLength("docs", users.length)(req, res)
    );

    it(
      "should return a json object with an array of users",
      arrayObjectsHas("docs", ["_id", "user", "password"])(req, res)
    );

    it("should send server error [500]", sendStatus(500)({}, res));
  });
});
