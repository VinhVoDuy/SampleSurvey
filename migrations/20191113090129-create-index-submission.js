// Isn't this one already added in the previous migration ?
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex(
    'Submissions',
    ['userId', 'surveyId'],
    { name: 'submissions_userId_surveyId' },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeIndex('Submissions', 'submissions_userId_surveyId'),
};
