const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = {
  generateAuthToken: (user) => {
    return jwt.sign({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }, keys.jwtPrivateKey);
  },
}