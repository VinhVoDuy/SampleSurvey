const router = require('express').Router();
const {
  getSurveyFromId,
  getSurveyFromEventCode,
  submmit } = require('../controllers/survey');
const db = require('../models');

router.get('/eventCode/:eventCode', getSurveyFromEventCode);
router.post('/submit', submmit);
router.get('/:id', getSurveyFromId)

module.exports = router;