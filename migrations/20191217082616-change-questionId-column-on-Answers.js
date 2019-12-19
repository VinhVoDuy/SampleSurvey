'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Answers', 'questionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Answers', 'questionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'id'
      }
    })
  }
};
