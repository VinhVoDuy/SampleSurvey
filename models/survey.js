'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    title: DataTypes.STRING,
    eventCode: DataTypes.STRING,
    totalScore: DataTypes.INTEGER,
    submissions: DataTypes.INTEGER,
    avgScore: DataTypes.FLOAT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  }, {});
  Survey.associate = function (models) {
    Survey.hasMany(models.Submission, { foreignKey: 'surveyId' });
    Survey.hasMany(models.Question, { as: 'questions', foreignKey: 'surveyId' });
  };
  return Survey;
};