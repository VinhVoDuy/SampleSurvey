const router = require('express').Router();
const { getSurveyFromEventCode, submmit } = require('../controllers/survey');
const db = require('../models');

router.get('/eventCode/:eventCode', getSurveyFromEventCode);
router.post('/submit', submmit);
router.get('/avg/:id', async (req, res) => {
  const survey = await db.Survey.findByPk(req.params.id);

  if (!survey) return res.status(404).send('Survey is not found.');

  return res.json({ avgScore: survey.avgScore });
})

module.exports = router;