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

console.log(
  `https://graph.facebook.com/oauth/access_token?\
client_id=506153643447733&client_secret=cdc91c07f205eaf69cfe28cd992b4300\
&redirect_uri=http://localhost:3000/auth/facebook/success\
&code=`);

PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports.server = server;
module.exports.app = app;
