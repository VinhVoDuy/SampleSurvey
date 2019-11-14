'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubmissionDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      submissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Submissions',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      answerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Answers',
          key: 'id'
        },
        onUpdate: 'cascade'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubmissionDetails');
  }
};
