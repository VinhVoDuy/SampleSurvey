const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = function generateAuthToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    facebookId: user.facebookId
  }, keys.jwtPrivateKey);
}