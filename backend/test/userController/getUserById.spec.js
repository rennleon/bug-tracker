const { assert } = require("chai");
const sinon = require("sinon");

const User = require("../../src/models/User");
const { getUserById } = require("../../src/controllers/userController");
const { default: mongoose, mongo } = require("mongoose");

describe("getUserById", function () {
  const req = {
    query: {},
    params: {},
    body: {},
    user: { id: mongoose.Types.ObjectId() },
  };
  const res = { json: sinon.spy(), sendStatus: sinon.spy() };

  afterEach(() => {
    res.json = sinon.spy();
    res.sendStatus = sinon.spy();
  });

  describe("empty DB", function () {
    before(
      "Clear DB",
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

    it("should send forbidden status [403] on same id", () =>
      new Promise(async (resolve, reject) => {
        try {
          const id = mongoose.Types.ObjectId();
          await getUserById({ params: { id }, user: { id } }, res);
          assert.isTrue(res.sendStatus.calledWith(403));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should send not found status [404]", () =>
      new Promise(async (resolve, reject) => {
        try {
          const id = mongoose.Types.ObjectId();
          await getUserById({ ...req, params: { id } }, res);
          assert.isTrue(res.sendStatus.calledWith(404));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should send server error status [500] on invalid mongo id", () =>
      new Promise(async (resolve, reject) => {
        try {
          const id = 1;
          await getUserById({ ...req, params: { id } }, res);
          assert.isTrue(res.sendStatus.calledWith(500));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));
  });

  describe("DB with data", function () {
    let users = [];

    before(
      "Add test users",
      () =>
        new Promise(async (resolve, reject) => {
          try {
            users = await User.insertMany([
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
      "Remove test users",
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

    it("should return a json object on valid user id", () =>
      new Promise(async (resolve, reject) => {
        try {
          const id = users[0]?._id;
          await getUserById({ ...req, params: { id } }, res);
          assert.equal(typeof {}, typeof res.json.getCall(-1).args[0]);
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should return a user as json object with valid attributes", () =>
      new Promise(async (resolve, reject) => {
        try {
          const id = users[0]?._id;
          await getUserById({ ...req, params: { id } }, res);
          sinon.assert.calledWith(res.json, sinon.match.has("_id"));
          sinon.assert.calledWith(res.json, sinon.match.has("user"));
          sinon.assert.calledWith(res.json, sinon.match.has("refreshToken"));
          sinon.assert.calledWith(res.json, sinon.match.has("roles"));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should send not found status [404]", () =>
      new Promise(async (resolve, reject) => {
        try {
          const id = mongoose.Types.ObjectId();
          await getUserById({ ...req, params: { id } }, res);
          assert.isTrue(res.sendStatus.calledWith(404));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));

    it("should send server error [500] on invalid id", () =>
      new Promise(async (resolve, reject) => {
        try {
          await getUserById({ params: { id: 1 } }, res);
          assert.isTrue(res.sendStatus.calledWith(500));
          resolve();
        } catch (error) {
          reject(error);
        }
      }));
  });
});
