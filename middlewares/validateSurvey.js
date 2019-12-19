const Joi = require('joi');

module.exports = (req, res, next) => {
  const answerSchema = Joi.object().keys({
    id: Joi.number(),
    description: Joi.string().max(255).required(),
    score: Joi.number().required()
  });
     
  const questionSchema = Joi.object().keys({
        description: Joi.string().required().max(255),
        answers: Joi.array().items(answerSchema).required().min(1)
      });

  const surveySchema = Joi.object().keys({
    title: Joi.string().required(),
    questions: Joi.array().items(questionSchema).required().min(1),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
  });

  const { error } = Joi.validate(req.body, surveySchema);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}