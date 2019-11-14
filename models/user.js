'use strict';
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    idAdmin: DataTypes.BOOLEAN
  }, {});

  User.associate = function (models) {
    User.hasOne(models.Submission, { foreignKey: 'userId' });
  };

  User.prototype.generateAuthToken = function () {
    return jwt.sign({
      id: this.id,
      email: this.email,
      isAdmin: this.isAdmin
    }, keys.jwtPrivateKey);
  }

  return User;
};