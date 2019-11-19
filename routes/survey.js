const router = require('express').Router();
const db = require('../models');
const {
  getSurveyFromId,
  getSurveyFromEventCode,
  submit } = require('../controllers/survey');
// const db = require('../models');
const { validateSubmission } = require('../middlewares/survey');
const auth = require('../middlewares/auth');

router.get('/eventCode/:eventCode', getSurveyFromEventCode);
router.post('/submit', validateSubmission, submit);
router.get('/:id', getSurveyFromId);
router.get('/test/test', auth, async (req, res) => {

  res.send(req.user);
})

module.exports = router;