const sinon = require("sinon");
const User = require("../../src/models/User");

const sandbox = sinon.createSandbox();

module.exports = sandbox.stub(User);
