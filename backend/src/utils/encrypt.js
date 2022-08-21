const bcrypt = require("bcrypt");

const encrypt = async (msg, saltRound = 10) => {
  const encrypted = await bcrypt.hash(msg, saltRound);
  return encrypted;
};

const matchEncrypt = (msg, encrypted) => {
  return bcrypt.compare(msg, encrypted);
};

module.exports = {
  encrypt,
  matchEncrypt,
};
