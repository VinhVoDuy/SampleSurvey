const { Sequelize, sequelize, Survey, Answer } = require('../models');
const Op = Sequelize.Op;

module.exports = {
  updateSurveyNewSubmission: async (surveyId, newAnswerIds) => {
    let newScore = 0;

    const newAnswers = await Answer.findAll({
      where: {
        id: {
          [Op.in]: newAnswerIds
        }
      }
    });

    newAnswers.forEach(a => {
      newScore += a.score;
    });

    await Survey.update({
      totalScore: sequelize.literal(`"totalScore" + ${newScore}`),
      submissions: sequelize.literal('submissions + 1')
    }, { where: { id: surveyId } });
  },

  updateSurveyOldSubmission: async (surveyId, oldAnswerIds, newAnswerIds) => {
    let newScore = 0;
    let oldScore = 0;
    let diffScore = 0;

    const newAnswers = await Answer.findAll({
      where: {
        id: {
          [Op.in]: newAnswerIds
        }
      }
    });

    newAnswers.forEach(a => {
      newScore += a.score;
    });

    const oldAnswers = await Answer.findAll({
      where: {
        id: {
          [Op.in]: oldAnswerIds
        }
      }
    });

    oldAnswers.forEach(a => {
      oldScore += a.score;
    });

    diffScore = newScore - oldScore;

    await Survey.update({
      totalScore: sequelize.literal(`"totalScore" + ${diffScore}`),
    }, { where: { id: surveyId } });
  }
}