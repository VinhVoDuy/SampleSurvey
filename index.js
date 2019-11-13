const express = require("express");
const app = express();
require("express-async-errors");
require('./startups/routes')(app);


PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports.server = server;
module.exports.app = app;
