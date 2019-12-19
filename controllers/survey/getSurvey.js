const { Survey, Question, Answer } = require('../../models');

module.exports = {
  getAllSurveys: async (req, res) => {
    const surveys = await Survey.findAll();

    return res.send(surveys);
  },

  getSurveyFromId: async (req, res) => {
    const survey = await Survey.findByPk(req.params.id, {
      include: [
        {model: Question, as: 'questions', include: [
          {model: Answer, as: 'answers'}
        ]}
      ]
    });

    if (!survey) return res.status(404).send('Survey is not found.');

    return res.send(survey);
  },

  getSurveyFromEventCode: async (req, res) => {
    const eventCode = req.params.eventCode;
    const survey = await Survey.findOne({ where: { eventCode } });
    if (!survey) return res.status(404).send('Survey is not found.');

    return res.send(survey);
  }
}