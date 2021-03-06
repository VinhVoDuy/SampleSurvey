'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      // validate: {
      //   isEmail: true
      // }
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    facebookId: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.hasOne(models.Submission, { foreignKey: 'userId' });
  };

  return User;
};