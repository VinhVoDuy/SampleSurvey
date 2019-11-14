// ARRAY is not supported in MYSQL
// DIFFERENT DB on dev & prod may cause unexpected errors
// no mysql package for production also
module.exports = {
  up: (queryInterface, Sequelize) => {
    const createTable = queryInterface.createTable('Submissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      surveyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Surveys',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      answerIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return createTable.then(() => queryInterface.addConstraint('Submissions', ['userId', 'surveyId'], {
      type: 'unique',
      name: 'Submissions_userId_surveyId_key',
    }));
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Submissions'),
};
