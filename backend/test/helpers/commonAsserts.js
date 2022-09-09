const { assert } = require("chai");
const sinon = require("sinon");

const commonAsserts = (tester) => ({
  testSendStatus: (status) => (req, res) => () =>
    tester
      .setupAsserts(() => {
        assert.isTrue(res.sendStatus.calledWith(status));
      })
      .exec(req, res),

  testStatus: (status) => (req, res) => () =>
    tester
      .setupAsserts(() => {
        assert.isTrue(res.status.calledWith(status));
      })
      .exec(req, res),

  testJsonHas:
    (attributes = [[], []]) =>
    (req, res) =>
    () =>
      tester
        .setupAsserts(() => {
          attributes.forEach((attrs) =>
            sinon.assert.calledWith(res.json, sinon.match.has(...attrs))
          );
        })
        .exec(req, res),

  testJsonPropIsArrayWithLength: (attr, length) => (req, res) => () =>
    tester
      .setupAsserts(() => {
        const calledWith = res.json.args.slice(-1)[0][0];
        const arr = calledWith[attr];
        assert.isTrue(arr instanceof Array);
        assert.equal(arr.length, length);
      })
      .exec(req, res),

  testJsonPropArrayObjectsHasAttrs: (attr, attributes) => (req, res) => () =>
    tester
      .setupAsserts(() => {
        const calledWith = res.json.args.slice(-1)[0][0];
        const arr = calledWith[attr];
        assert.isTrue(arr instanceof Array);
        arr.forEach((obj) => assert.containsAllKeys(obj, attributes));
      })
      .exec(req, res),
});

module.exports = commonAsserts;
