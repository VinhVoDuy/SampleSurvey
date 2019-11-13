'use strict';
module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    userId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER,
    answerId: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Submission.associate = function (models) {
    // associations can be defined here
    Submission.belongsTo(models.User);
    Submission.belongsTo(models.Survey);
  };
  return Submission;
};