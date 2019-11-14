'use strict';
const db = require('../models');
console.log('Submission model call it ');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    userId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER,
    answerIds: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Submission.associate = function (models) {
    // associations can be defined here
    Submission.belongsTo(models.User, { foreignKey: 'userId' });
    Submission.belongsTo(models.Survey, { foreignKey: 'surveyId' });
  }

  return Submission;
};