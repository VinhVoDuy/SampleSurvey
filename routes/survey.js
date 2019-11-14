const router = require('express').Router();
const db = require('../models');
const {
  getSurveyFromId,
  getSurveyFromEventCode,
  submit } = require('../controllers/survey');
// const db = require('../models');
const { validateSubmission } = require('../middlewares/survey');

router.get('/eventCode/:eventCode', getSurveyFromEventCode);
router.post('/submit', validateSubmission, submit);
router.get('/:id', getSurveyFromId);
router.get('/test/test', async (req, res) => {
  const survey = await db.Survey.findOne();

  res.send(survey.avgScore);
})

module.exports = router;