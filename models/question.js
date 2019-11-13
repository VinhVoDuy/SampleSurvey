'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    description: DataTypes.STRING,
    surveyId: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    // Question.belongsTo(models.Survey);
    // Question.hasOne(models.Answer);
  };
  return Question;
};