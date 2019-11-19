const express = require('express');
const passport = require('passport');
const session = require('express-session');

const user = require('../routes/user');
const survey = require('../routes/survey');
const authFacebook = require('../routes/auth-facebook');

module.exports = (app) => {
  app.use(express.json());
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/', (req, res) => {
    res.send('Welcome to survey service.');
  });

  app.use('/api/user', user);
  app.use('/api/survey', survey);
  app.use('/auth/facebook', authFacebook);

  app.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message || 'Internal server error.');
    throw err;
  });
}