const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function (req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).send("Token is not provided.");

  try {
    const decoded = jwt.verify(token, keys.jwtPrivateKey);

    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(401).send("Access denied.");
  }
}