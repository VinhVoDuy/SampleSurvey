const Joi = require('joi');

function validateSubmission(body) {
  const schema = Joi.object().keys({
    userId: Joi.number().required(),
    surveyId: Joi.number().required(),
    answerIds: Joi.array().items(Joi.number())
  });

  return Joi.validate(body, schema);
}

exports.validateSubmission = validateSubmission;