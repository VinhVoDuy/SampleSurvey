const { Survey, Question, Answer } = require('../../models')

module.exports = async (req, res) => {
  const { id } = req.params;
  const { title, questions, startTime, endTime } = req.body;

  await Survey.update({ title }, { where: { id } });

  await Promise.all(questions.map(async ({ id, description, answers }) => {
    await Promise.all(answers.map(({ id, description, score }) => {
      return Answer.upsert({ id, description, score });
    }))
    return Question.upsert({ id, description });
  }));

  const newSurvey = await Survey.findByPk(req.params.id, {
    include: [
      {model: Question, as: 'questions', include: [
        {model: Answer, as: 'answers'}
      ]}
    ]
  });

  return res.send(newSurvey);
}