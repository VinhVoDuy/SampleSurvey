const express = require('express');

const user = require('../routes/user');

module.exports = (app) => {
  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('Welcome to survey service.');
  });

  app.use('/api/user', user);

  app.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message || 'Internal server error.');
  });
}