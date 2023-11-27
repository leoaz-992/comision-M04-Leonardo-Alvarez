const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = process.env.JWT_SECRET_KEY;

const createAccessToken = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, TOKEN_SECRET_KEY, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = createAccessToken;
