'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Surveys', 'avgScore', Sequelize.FLOAT);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Surveys', 'avgScore');
  }
};
