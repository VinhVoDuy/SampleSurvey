'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    eventCode: DataTypes.STRING,
    totalScore: DataTypes.INTEGER,
    submissions: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {});
  Survey.associate = function (models) {
    // Survey.hasOne(models.Submission);
    // Survey.hasOne(models.Question);
  };
  return Survey;
};