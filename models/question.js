'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    description: DataTypes.STRING,
    surveyId: DataTypes.INTEGER,
  }, {});
  Question.associate = function (models) {
    Question.belongsTo(models.Survey, {foreignKey: 'surveyId' });
    Question.hasMany(models.Answer, { as: 'answers', foreignKey: 'questionId' });
  };
  return Question;
};