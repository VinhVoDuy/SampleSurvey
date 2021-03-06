const { sequelize, Survey } = require('../../models');

const updateSurveyOldSubmission = (surveyId, oldAnswers, newAnswers) => {
  const newScore = newAnswers.reduce((a, c) => a + c.score, 0);
  const oldScore = oldAnswers.reduce((a, c) => a + c.score, 0);
  const diffScore = newScore - oldScore;

  return Survey.update({
    totalScore: sequelize.literal(`"totalScore" + ${diffScore}`),
    avgScore: sequelize.literal(`("totalScore" + ${diffScore}) / submissions`)
  }, { where: { id: surveyId } });
}

module.exports = updateSurveyOldSubmission;