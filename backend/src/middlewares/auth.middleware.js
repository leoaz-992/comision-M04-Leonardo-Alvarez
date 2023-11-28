const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.JWT_SECRET_KEY;

const auth = (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res
        .status(403)
        .json({ message: "No token, authorization denied" });
    }
    jwt.verify(token, TOKEN_SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = auth;
