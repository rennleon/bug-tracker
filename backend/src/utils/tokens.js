const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { user: user._id, roles: user.roles },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
