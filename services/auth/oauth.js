const request = require('request-promise');
const { facebook_app_id, facebook_app_secret } = require('../../config/keys');

module.exports = {
  getProfileFromAccessToken: (access_token) => {
    return request.get(`https://graph.facebook.com/me?access_token=${access_token}`,
      { json: true, simple: false });
  },

  getAccessTokenFromCode: async (code) => {
    const { access_token } = await request.get(
      `https://graph.facebook.com/oauth/access_token?client_id=${facebook_app_id}&client_secret=${facebook_app_secret}&redirect_uri=http://localhost:3000/auth/facebook/success&code=${code}`,
      { json: true, simple: false });

    return access_token;
  },
}