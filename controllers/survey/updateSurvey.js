const { Sequelize, Survey, Question, Answer } = require('../../models');
const { in: opIn } = Sequelize.Op;

module.exports = async (req, res) => {
  const surveyId = req.params.id;
  const { title, questions, startTime, endTime } = req.body;

  await Survey.update({ title }, { where: { id: surveyId } });

  const x = await Question.findAll({ where: { surveyId }, attributes: ['id'] });
  const dbQuestionIds = x.map(qid => {
    return qid.id
  });

  const submitQuestionIds = questions.map(q => q.id);

  const destroyQuestionIds = dbQuestionIds.filter(id => !submitQuestionIds.includes(id));

  const y = await Answer.findAll({ where: { questionId: { [opIn]: dbQuestionIds } } })
  const dbAnswerIds = y.map(aid => aid.id);
  console.log(`dbAnswer: ${dbAnswerIds}`);
  let submitAnswerIds = questions.map(({ answers }) => answers.map(answer => answer.id)).flat();
  console.log(submitAnswerIds);

await Promise.all(questions.map(async ({ id: questionId, description, answers }) => {
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

await Question.destroy({
  where: {
    id: {
      [opIn]: destroyQuestionIds
    }
  }
});

const destroyAnswerIds = dbAnswerIds.filter(id => !submitAnswerIds.includes(id));
console.log(`submitAnswerIds: ${submitAnswerIds}`);
console.log(`destroyAnswerIds: ${destroyAnswerIds}`);

await Answer.destroy({
  where: {
    id: {
      [opIn]: destroyAnswerIds
    }
  }
});

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
}
