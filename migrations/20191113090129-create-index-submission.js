'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'Submissions',
      ['userId', 'surveyId'],
      { name: 'submissions_userId_surveyId' });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Submissions', 'submissions_userId_surveyId');
  }
};
