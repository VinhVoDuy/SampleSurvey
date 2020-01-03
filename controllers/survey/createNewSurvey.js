const { sequelize, Survey, Question, Answer } = require('../../models');
const generateEventCode = require("../../services/survey/generateRandomDecimalString");

module.exports = async (req, res) => {
  const { title, questions, startTime, endTime } = req.body;
  const eventCode = generateEventCode();

  sequelize.transaction(t => {
    return Survey.create({
      title,
      eventCode,
      startTime,
      endTime
    }).then(survey => {
      return Promise.all(
        questions.map(({ description, answers }) => Question.create({
          surveyId: survey.id,
          description
        }).then(question => {
          return Promise.all(
            answers.map(({ description, score }) =>
              Answer.create({
                questionId: question.id,
                description, score
              })));
        })))
    })
  }).then(() => {
    return res.send("Survey is successfully created.");
  }).catch(e => {
    res.status(500).send("Failed to create the survey.");
  });
}
