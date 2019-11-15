const { Survey, Submission } = require('../models');
const {
  updateSurveyNewSubmission,
  updateSurveyOldSubmission,
} = require('../services/survey');

module.exports = {
  getSurveyFromId: async (req, res) => {
    const survey = await db.Survey.findByPk(req.params.id);

    if (!survey) return res.status(404).send('Survey is not found.');

    return res.send({
      id: survey.id,
      eventCode: survey.eventCode,
      submissions: survey.submissions,
      totalScore: survey.totalScore,
      avgScore: survey.avgScore,
      startTime: survey.startTime,
      endTime: survey.endTime,
    });
  },

  getSurveyFromEventCode: async (req, res) => {
    const eventCode = req.params.eventCode;
    const survey = await db.Survey.findOne({ where: { eventCode } });
    if (!survey) return res.status(404).send('Survey is not found.');

    return res.send(survey);
  },

  submmit: async (req, res) => {
    const { error } = validateSubmission(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { userId, surveyId, answerIds } = req.body;
    let submission = await Submission.findOne({ where: { userId, surveyId } });
    if (!submission) {
      submission = await db.Submission.create({
        userId,
        surveyId,
        answerIds,
      });
      // There is a case: answerId not exist in db: like 1000
      // Then later, it exist because auto increasement
      // Database become inconsistent
      //
      await updateSurveyNewSubmission(surveyId, answerIds);
    } else {
      // MUST update the survey (totalScore and number of submissions)
      // before update the existing submission itself.
      await submission.updateSurvey(answerIds, { new: false });
      await submission.update({ answerIds });
      // why ?
    }

    return res.send(submission);
  },
};
