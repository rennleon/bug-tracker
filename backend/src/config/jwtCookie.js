const JWT_REFRESH_COOKIE = {
  name: "jwt",
  options: {
    httpOnly: true,
    expiresIn: 24 * 60 * 60 * 1000,
  },
};

module.exports = JWT_REFRESH_COOKIE;
