const { assert } = require("chai");
const sinon = require("sinon");

const User = require("../../src/models/User");
const { getAllUsers } = require("../../src/controllers/userController");

describe("getAllUsers", function () {
  const req = { query: {}, params: {}, body: {}, user: {} };
  const res = { json: sinon.spy(), sendStatus: sinon.spy() };

  before("Inject new user into request", function () {
    this.timeout(60_000);

    return new Promise(async (resolve, reject) => {
      try {
        const newUser = await User.create({
          user: "test-user",
          password: "abc123",
          roles: ["ADMIN"],
        });
        req.user = { id: newUser._id, roles: newUser.roles };
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });

  after("Remove injected user", function () {
    this.timeout(60_000);

    return new Promise(async (resolve, reject) => {
      try {
        req.user = {};
        await User.deleteMany({ user: "test-user" }).exec();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });

  describe("empty DB", function () {
    before(
      () =>
        new Promise(async (resolve, reject) => {
          try {
            await User.deleteMany({}).exec();
            resolve();
          } catch (err) {
            reject(err);
          }
        })
    );

    it("should send empty content [204]", () =>
      new Promise(async (resolve, reject) => {
        try {
          await getAllUsers(req, res);
          assert.isTrue(res.sendStatus.calledWith(204));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should send server error [500]", () =>
      new Promise(async (resolve, reject) => {
        try {
          await getAllUsers({}, res);
          assert.isTrue(res.sendStatus.calledWith(500));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));
  });

  describe("DB with data", function () {
    before(
      () =>
        new Promise(async (resolve, reject) => {
          try {
            await User.insertMany([
              { user: "test-user", password: "12345", roles: ["USER"] },
              { user: "test-user", password: "12345", roles: ["USER"] },
              { user: "test-user", password: "12345", roles: ["USER"] },
              { user: "test-user", password: "12345", roles: ["USER"] },
            ]);
            resolve();
          } catch (err) {
            reject(err);
          }
        })
    );

    after(
      () =>
        new Promise(async (resolve, reject) => {
          try {
            await User.deleteMany({ user: "test-user" }).exec();
            resolve();
          } catch (err) {
            reject(err);
          }
        })
    );

    it("should return a json object", () =>
      new Promise(async (resolve, reject) => {
        try {
          await getAllUsers(req, res);
          assert.equal(typeof {}, typeof res.json.args[0][0]);
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should return a json object with an array of 4 users", () =>
      new Promise(async (resolve, reject) => {
        try {
          await getAllUsers(req, res);
          const usersArr = res.json.getCall(-1).args[0].docs;
          assert.equal(typeof [], typeof usersArr);
          assert.equal(4, usersArr.length);
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should send server error [500]", () =>
      new Promise(async (resolve, reject) => {
        try {
          await getAllUsers({}, res);
          assert.isTrue(res.sendStatus.calledWith(500));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));
  });
});
