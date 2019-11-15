const { sequelize, Survey, Submission } = require('../models');
const validateAndPopulateAnswers = require('../services/survey/validateAnswer.js');
const populateAnswers = require('../services/survey/populateOldAnswer');
const updateSurveyNewSubmission = require('../services/survey/updateNewSub');
const updateSurveyOldSubmission = require('../services/survey/updateOldSub');

module.exports = {
  getSurveyFromId: async (req, res) => {
    const survey = await Survey.findByPk(req.params.id);

    if (!survey) return res.status(404).send('Survey is not found.');

    return res.send(survey);
  },

  getSurveyFromEventCode: async (req, res) => {
    const eventCode = req.params.eventCode;
    const survey = await Survey.findOne({ where: { eventCode } });
    if (!survey) return res.status(404).send('Survey is not found.');

    return res.send(survey);
  },

  submit: async (req, res) => {
    const { userId, surveyId, answerIds } = req.body;

    const newAnswers = await validateAndPopulateAnswers(answerIds, surveyId);
    if (newAnswers.error) return res.status(400).send(newAnswers.error.message);

    let submission = await Submission.findOne({ where: { userId, surveyId } });
    if (!submission) {
      //   submission = await Submission.create({
      //     userId,
      //     surveyId,
      //     answerIds
      //   });
      //   await updateSurveyNewSubmission(surveyId, newAnswers);

      sequelize.transaction((t) => {
        return Submission.create({
          userId,
          surveyId,
          answerIds
        }).then((submission) => {
          return updateSurveyNewSubmission(surveyId, newAnswers)
            .then(() => {
              return res.send(submission);
            });
        }).catch((err) => {
          res.status(500).send("Failed to submit");
          throw err;
        });
      });
    } else {
      const oldAnswerIds = submission.answerIds;
      const oldAnswers = await populateAnswers(oldAnswerIds, surveyId);

      sequelize.transaction((t) => {
        return updateSurveyOldSubmission(surveyId, oldAnswers, newAnswers)
          .then(() => {
            return submission.update({ answerIds })
              .then((submission) => {
                return res.send(submission);
              });
          })
          .catch((err) => {
            res.status(500).send("Failed to update the submission");
            throw err;
          });
      });
      // return res.send(submission);
    }
  }
}

