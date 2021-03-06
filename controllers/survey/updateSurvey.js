const { Sequelize, Survey, Question, Answer } = require('../../models');
const { in: opIn } = Sequelize.Op;

module.exports = async (req, res) => {
  const surveyId = req.params.id;
  const { title, questions: submitQuestions, startTime, endTime } = req.body;

  await Promise.all([
    updateSurvey(),
    updateQuestionsAndAnswers(),
    destroyOldQuestionsAndAnswers()
  ]);

  const newSurvey = await Survey.findByPk(req.params.id, {
    include: [
      {
        model: Question, as: 'questions', include: [
          { model: Answer, as: 'answers' }
        ]
      }
    ]
  });

  return res.send(newSurvey);

  function updateSurvey() {
    return Survey.update({ title, startTime, endTime }, { where: { id: surveyId } });
  }

  function updateQuestionsAndAnswers() {
    return Promise.all(submitQuestions.map(async ({ id: questionId, description, answers }) => {
      if (!questionId) {
        return Question.create({ description, surveyId })
          .then(async ({ id: newlyCreatedQuestionId }) => {
            await Promise.all(answers.map(({ id: answerId, description, score }) => {
              return Answer.upsert({
                id: answerId,
                description,
                score,
                questionId: newlyCreatedQuestionId
              });
            }));
          })
      } else {
        await Promise.all(answers.map(({ id: answerId, description, score }) => {
          return Answer.upsert({
            id: answerId,
            description,
            score,
            questionId
          });
        }));

        return Question.update({ description, surveyId }, { where: { id: questionId } });
      }
    }));
  }

  async function destroyOldQuestionsAndAnswers() {
    const promises = [];

    const dbQuestions = await Question.findAll({ where: { surveyId }, attributes: ['id'] });
    const dbQuestionIds = dbQuestions.map(q => {
      return q.id;
    });

    const submitQuestionIds = submitQuestions.map(q => q.id);
    const destroyQuestionIds = dbQuestionIds.filter(id => !submitQuestionIds.includes(id));

    const dbAnswers = await Answer.findAll({ where: { questionId: { [opIn]: dbQuestionIds } } })
    const dbAnswerIds = dbAnswers.map(a => a.id);

    let submitAnswerIds = submitQuestions.map(({ answers }) => answers.map(answer => answer.id)).flat();
    const destroyAnswerIds = dbAnswerIds.filter(id => !submitAnswerIds.includes(id));

    if (destroyQuestionIds.length) {
      promises.push(Question.destroy({
        where: {
          id: {
            [opIn]: destroyQuestionIds
          }
        }
      }));
    }

    if (destroyAnswerIds.length) {
      promises.push(Answer.destroy({
        where: {
          id: {
            [opIn]: destroyAnswerIds
          }
        }
      }));
    }

    return promises;
  }
}
