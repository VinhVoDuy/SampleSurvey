const jwt = require('jsonwebtoken');
const _ = require('lodash');
const keys = require('../../config/keys');

module.exports = function generateFacebookAuthToken(user) {
  return jwt.sign(_.pick(user, ['id', 'facebookId']), keys.jwtPrivateKey);
}