// split into 2 files is better. These functions are big.  Hard to read in the file
const {
  Sequelize, sequelize, Survey, Answer,
} = require('../models');

// remove unused things
const Op = Sequelize.Op;

//
// These 2 functions share a lot of logics. Can DRY here ?
//
module.exports = {
  updateSurveyNewSubmission: async (surveyId, newAnswerIds) => {
    // use functional to remove the useless state & side-effect
    let newScore = 0;

    // need to check if answerIds is in the questions of the survey
    // what if the answer is not belong to the survey ?
    const newAnswers = await Answer.findAll({
      where: {
        id: {
          [Op.in]: newAnswerIds,
        },
      },
    });

    // Why not Functional ??
    // newAnswers.reduce((sum, score) => sum + score, 0);
    //
    newAnswers.forEach((a) => {
      newScore += a.score;
    });

    await Survey.update({
      totalScore: sequelize.literal(`"totalScore" + ${newScore}`),
      submissions: sequelize.literal('submissions + 1'),
      avgScore: sequelize.literal('totalScore / submissions'),
    }, { where: { id: surveyId } });
  },

  updateSurveyOldSubmission: async (surveyId, oldAnswerIds, newAnswerIds) => {
    let newScore = 0;
    let oldScore = 0;
    let diffScore = 0;

    const newAnswers = await Answer.findAll({
      where: {
        id: {
          [Op.in]: newAnswerIds,
        },
      },
    });

    newAnswers.forEach((a) => {
      newScore += a.score;
    });

    const oldAnswers = await Answer.findAll({
      where: {
        id: {
          [Op.in]: oldAnswerIds,
        },
      },
    });

    oldAnswers.forEach((a) => {
      oldScore += a.score;
    });

    diffScore = newScore - oldScore;

    await Survey.update({
      totalScore: sequelize.literal(`"totalScore" + ${diffScore}`),
      //  avgScore: sequelize.literal(`("totalScore" + ${diffScore}) / submissions`),
    }, { where: { id: surveyId } });

    // twice db accesses
    await Survey.update({
      avgScore: sequelize.literal('"totalScore" / submissions'),
    }, { where: { id: surveyId } });
  },
};
