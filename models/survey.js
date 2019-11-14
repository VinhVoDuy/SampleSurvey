'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    eventCode: DataTypes.STRING,
    totalScore: DataTypes.INTEGER,
    submissions: DataTypes.INTEGER,
    avgScore: DataTypes.FLOAT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {});
  Survey.associate = function (models) {
    Survey.hasOne(models.Submission, { foreignKey: 'surveyId' });
    Survey.hasOne(models.Question, { foreignKey: 'surveyId' });
  };
  return Survey;
};