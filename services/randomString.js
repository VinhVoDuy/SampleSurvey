const crypto = require('crypto');

module.exports = function randomString(length) {
  return crypto.randomBytes(length).toString('hex');
}