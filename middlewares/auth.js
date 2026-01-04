const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  // get the token from the Authorization header
  const { authorization } = req.headers;

  // check if the token is present and properly formatted
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  // If verification fails, respond with an error
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid token"));
  }
};
