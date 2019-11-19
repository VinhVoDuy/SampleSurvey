const { sequelize, Survey } = require('../../models');

const updateSurveyNewSubmission = async (surveyId, newAnswers) => {
  const newScore = newAnswers.reduce((a, c) => a + c.score, 0);

  return Survey.update({
    totalScore: sequelize.literal(`"totalScore" + ${newScore}`),
    submissions: sequelize.literal('submissions + 1'),
    avgScore: sequelize.literal(`("totalScore" + ${newScore}) / (submissions + 1)`)
  }, { where: { id: surveyId } });
}


module.exports = updateSurveyNewSubmission;
