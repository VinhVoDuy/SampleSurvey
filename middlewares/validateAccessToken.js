const request = require('request-promise');
const { facebook_app_id } = require('../config/keys');

module.exports = async function (req, res, next) {
  const { access_token } = req.query;

  const app = await request.get(
    `https://graph.facebook.com/app?access_token=${access_token}`,
    { simple: false, json: true });

  if (app.error) return res.status(400).send(app.error.message);
  if (app.id != facebook_app_id) return res.status(403).send("This malicious token is generated from another app.");

  next();
}