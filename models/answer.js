'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    description: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  Answer.associate = function (models) {
    // associations can be defined here
    Answer.belongsTo(models.Question);
  };
  return Answer;
};