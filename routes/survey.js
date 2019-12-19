const router = require("express").Router();
const { Survey, Question, Answer } = require("../models");
const {
  getAllSurveys,
  getSurveyFromId,
  getSurveyFromEventCode,
} = require("../controllers/survey/getSurvey");
const submit = require('../controllers/survey/submit');
const deleteSurvey = require('../controllers/survey/deleteSurvey');
const updateSurvey = require('../controllers/survey/updateSurvey');
const createSurvey = require('../controllers/survey/createNewSurvey');
const auth = require("../middlewares/validateToken");
const validateSubmission = require("../middlewares/validateSubmission");
const validateAdmin = require("../middlewares/validateAdmin");
const validateSurvey = require('../middlewares/validateSurvey');

router.get("/", [auth, validateAdmin], getAllSurveys);
router.get("/:id", auth, getSurveyFromId);
router.get("/eventCode/:eventCode", getSurveyFromEventCode);
router.post("/", [auth, validateAdmin, validateSurvey], createSurvey);
router.put("/:id", [auth, validateAdmin], updateSurvey);
router.delete("/:id", [auth, validateAdmin], deleteSurvey);
router.post("/submit", validateSubmission, submit);

module.exports = router;
