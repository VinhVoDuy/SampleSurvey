const Joi = require('joi');

function validateSubmission(req, res, next) {
  const schema = Joi.object().keys({
    userId: Joi.number().required(),
    surveyId: Joi.number().required(),
    answerIds: Joi.array().items(Joi.number())
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(error.details[0].message);

  next();
}

exports.validateSubmission = validateSubmission;
