const express = require("express");
const app = express();
require("express-async-errors");
require("./startups/auth");
require('./startups/routes')(app);

process.on('unhandledRejection', (err) => {
  throw err;
})
process.on('uncaughtException', (err) => {
  console.log(err);
})



PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test')
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });


module.exports.server = app;

