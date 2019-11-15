const { Survey, Submission } = require('../models');
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

    let submission = await Submission.findOne({ where: { userId, surveyId } });
    if (!submission) {
      submission = await Submission.create({
        userId,
        surveyId,
        answerIds
      });
      await updateSurveyNewSubmission(surveyId, newAnswers);
    } else {
      // MUST update the survey (totalScore and number of submissions) 
      // before update the existing submission itself.
      const oldAnswerIds = submission.answerIds;
      const oldAnswers = await populateAnswers(oldAnswerIds, surveyId);
      await submission.update({ answerIds });
      await updateSurveyOldSubmission(surveyId, oldAnswers, newAnswers);
    }

    return res.send(submission);
  }
}
