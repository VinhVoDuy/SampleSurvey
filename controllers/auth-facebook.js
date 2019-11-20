const { getAccessTokenFromCode, getProfileFromAccessToken } = require('../services/auth/oauth');
const { User } = require('../models');
const randomString = require('../services/randomString');
const generateFacebookAuthToken = require('../services/auth/generateFacebookAuthToken');

module.exports = {
  loginSucess: async (req, res) => {
    const { code } = req.query;

    const access_token = await getAccessTokenFromCode(code);
    const profile = await getProfileFromAccessToken(access_token);

    const [user] = await User.findOrCreate({
      where: {
        facebookId: profile.id
      },
      defaults: {
        facebookId: profile.id,
        email: randomString(20),
        password: randomString(20),
      }
    });

    const token = generateFacebookAuthToken(user);

    return res.send(token);
  },

  loginByAccessToken: async (req, res) => {
    const profile = await getProfileFromAccessToken(req.query['access_token']);

    const [user] = await User.findOrCreate({
      where: {
        facebookId: profile.id
      },
      defaults: {
        facebookId: profile.id,
        email: randomString(20),
        password: randomString(20),
      }
    });

    const token = generateFacebookAuthToken(user);

    return res.send(token);
  },
}