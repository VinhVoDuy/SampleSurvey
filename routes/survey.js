const router = require('express').Router();
const { getSurveyFromEventCode, submmit } = require('../controllers/survey');

router.get('/:eventCode', getSurveyFromEventCode);
router.post('/submit', submmit);

module.exports = router;