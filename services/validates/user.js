const Joi = require('joi');

function validateUserRegister(body) {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(50).required(),
    isAdmin: Joi.boolean(),
  });

  return Joi.validate(body, schema);
}

function validateUserLogin(body) {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required(),
  });

  return Joi.validate(body, schema);
}
// module.exports = { validateUserRegister, validateUserLogin };
// ???
exports.validateUserRegister = validateUserRegister;
exports.validateUserLogin = validateUserLogin;
