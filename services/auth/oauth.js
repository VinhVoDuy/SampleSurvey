const request = require('request');

module.exports = {
  getProfileFromAccessToken: (access_token) => {
    return new Promise((resolve, reject) => {
      request.get(`https://graph.facebook.com/me?access_token=${access_token}`,
        { json: true },
        (err, res, body) => {
          if (err) { reject(err) }
          else { resolve(body) }
        });
    })
  },

  getAccessTokenFromCode: (code) => {
    return new Promise((resolve, reject) => {
      request.get(
        `https://graph.facebook.com/oauth/access_token?client_id=506153643447733&client_secret=cdc91c07f205eaf69cfe28cd992b4300&redirect_uri=http://localhost:3000/auth/facebook/success&code=${code}`,
        { json: true },
        (err, res, body) => {
          if (err) { reject(err) }
          else { resolve(body.access_token) }
        });
    });
  }
}