module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    eventCode: DataTypes.STRING,
    totalScore: DataTypes.INTEGER,
    submissions: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  }, {
    // it works but pls don't manipulation the models
    // we may add avgScore column then this computation is handled by database. We can keep the model is just raw data
    // or we may put the logic on where the avgScore is used
    getterMethods: {
      avgScore() {
        return this.submissions === 0 ? 0 : this.totalScore / this.submissions;
      },
    },
  });
  Survey.associate = function (models) {
    /* Why don't use associations ? */
    // Survey.hasOne(models.Submission);
    // Survey.hasOne(models.Question);
  };
  return Survey;
};
