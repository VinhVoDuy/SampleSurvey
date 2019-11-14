const Joi = require('joi');

function validateUserRegister(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(50).required(),
    isAdmin: Joi.boolean()
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(error.details[0].message);

  next();
}

function validateUserLogin(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required()
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(error.details[0].message);

  next();
}

exports.validateUserRegister = validateUserRegister;
exports.validateUserLogin = validateUserLogin;