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
  return jwt.sign({ user: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (secret) => (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);

      resolve(decoded);
    });
  });

const verifyAccessToken = verifyToken(process.env.ACCESS_TOKEN_SECRET);
const verifyRefreshToken = verifyToken(process.env.REFRESH_TOKEN_SECRET);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
