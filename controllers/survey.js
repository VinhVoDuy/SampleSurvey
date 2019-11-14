// loading all db is too much. Some mistake may happen caused unrelated data changes
// I prefer to split controllers into many files. Then load some neccessary models for the specific function only
// One developer change the logic of submit or getSurvey. He may change the corresponding file.
// The current file may cause conflicts while many developers updating different functions
const db = require('../models');
// should be:
// const { Survey } = require('../models');
const { validateSubmission } = require('../services/validates/survey');

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

    let submission = await db.Submission.findOne({ where: { userId, surveyId } });
    if (!submission) {
      submission = await db.Submission.create({
        userId,
        surveyId,
        answerIds,
      });
      // should never send parameter as boolean. Split into 2 function instead
      // this is the smell of function has many responsibilities
      await submission.updateSurvey(answerIds, { new: true });
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
