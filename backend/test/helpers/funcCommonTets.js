const WrapFuncExecution = require("./funcWrapper");
const commonTests = require("./commonAsserts");

module.exports = (fn) => {
  const res = commonTests(new WrapFuncExecution(fn));

  return {
    resStatus: res.testStatus,
    jsonHas: res.testJsonHas,
    sendStatus: res.testSendStatus,
    arrayWithLength: res.testJsonPropIsArrayWithLength,
    arrayObjectsHas: res.testJsonPropArrayObjectsHasAttrs,
  };
};
