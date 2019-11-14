const db = require('../models');

console.log('Submission model call it ');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    userId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER,
    answerIds: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {});
  Submission.associate = function (models) {
    // associations can be defined here
    // Submission.belongsTo(models.User, { foreignKey: 'userId' });
    // Submission.belongsTo(models.Survey);

    // how come the Submission has function to updateSurvey ?
    models.Submission.prototype.updateSurvey = async function (newAnswerIds, options) {
      const survey = await models.Survey.findOne({ surveyId: this.surveyId });

      const newAnswers = await models.Answer.findAll({
        where: {
          id: {
            [Op.in]: newAnswerIds,
          },
        },
      });


      newAnswers.forEach((a) => {
        survey.totalScore += a.score;
      });
      survey.submissions += 1;

      if (options.new === false) {
        const oldAnswer = await models.Answer.findAll({
          where: {
            id: {
              [Op.in]: this.answerIds,
            },
          },
        });

        oldAnswer.forEach((a) => {
          survey.totalScore -= a.score;
        });
        survey.submissions -= 1;
      }

      await survey.save();
    };
  };


  return Submission;
};
