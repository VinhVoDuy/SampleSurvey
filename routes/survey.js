const router = require('express').Router();
const {
  getSurveyFromId,
  getSurveyFromEventCode,
  submit } = require('../controllers/survey');
// const db = require('../models');
const { validateSubmission } = require('../middlewares/survey');

router.get('/eventCode/:eventCode', getSurveyFromEventCode);
router.post('/submit', validateSubmission, submit);
router.get('/:id', getSurveyFromId)

module.exports = router;