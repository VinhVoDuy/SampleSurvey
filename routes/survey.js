const router = require('express').Router();
const db = require('../models');
console.log('Route survey.js call it');

router.get('/:eventCode', async (req, res) => {
  const eventCode = req.params.eventCode;
  const survey = await db.Survey.findOne({ where: { eventCode } });

  return res.send(survey);
});

router.post('/submit', async (req, res) => {
  // Validate input 

  const { userId, surveyId, answerIds } = req.body;

  let submission = await db.Submission.findOne({ where: { userId, surveyId } });
  if (!submission) {
    submission = await db.Submission.create({
      userId,
      surveyId,
      answerIds
    });
    await submission.updateSurvey(answerIds, { new: true });
  } else {
    // MUST update the survey (totalScore and number of submissions) 
    // before update the existing submission itself.
    await submission.updateSurvey(answerIds, { new: false });
    await submission.update({ answerIds });
  }

  return res.send(submission);
});

module.exports = router;