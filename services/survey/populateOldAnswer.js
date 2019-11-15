const { Sequelize, Answer, Question } = require('../../models');
const Op = Sequelize.Op;

module.exports = validateAndPopulateAnswers = async (answerIds, surveyId) => {
  return populatedAnswers = await Answer.findAll({
    where: {
      id: {
        [Op.in]: answerIds
      }
    },
    include: [
      {
        model: Question,
        where: { surveyId }
      }
    ]
  });
}