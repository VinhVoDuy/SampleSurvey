const { Sequelize, Answer, Question } = require('../../models');
const Op = Sequelize.Op;

module.exports = async (answerIds, surveyId) => {
  const populatedAnswers = await Answer.findAll({
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

  // Check if there's any answers from same question.
  const validatedAnswerIds = [...new Set(populatedAnswers.map(a => { return a.questionId }))];
  if (validatedAnswerIds.length !== answerIds.length) {
    return { error: { message: 'Invalid answerId(s).' } }
  } else {
    return populatedAnswers;
  }
}
