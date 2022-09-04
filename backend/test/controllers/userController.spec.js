const assert = require("chai").assert;

const userController = require("../../src/controllers/userController");

describe("userController", function () {
  describe("getAllUsers", function () {
    it("should return an object containing a lsit of users");
    it("should return results for query params");
  });

  describe("getUserById", function () {
    it("should return a user object for the specified id");
    it("should return an error on invalid id");
  });

  describe("createUser", function () {
    it("should create a new user");
    it("should fail on invalid body");
  });

  describe("updateUser", function () {
    it("should update valid user attributes");
    it("should fail on invalid id");
    it("should fail on invalid body");
  });

  describe("deleteUser", function () {
    it("should delete a user");
    it("should fail on invalid id");
  });
});
