const router = require('express').Router();
const passport = require('passport');
const redirectToLoginPage = require('../middlewares/redirectToLoginPage');
const { getAccessTokenFromCode, getProfileFromAccessToken } = require('../services/auth/oauth');
const { User } = require('../models');
const randomString = require('../services/randomString');

// router.get('/', passport.authenticate('facebook'));
// router.get('/callback',
//   passport.authenticate('facebook'),
//   (req, res) => {
//     res.redirect('/api/user/facebook-login');
//   })
router.get('/', redirectToLoginPage);

router.get('/success', async (req, res) => {
  const { code } = req.query;

  const access_token = await getAccessTokenFromCode(code);
  const profile = await getProfileFromAccessToken(access_token);

  let user = await User.findOrCreate({
    where: {
      facebookId: profile.id
    },
    defaults: {
      facebookId: profile.id,
      email: randomString(20),
      password: randomString(20),
    }
  });

  return res.send(user);
});

router.get('/access_token', async (req, res) => {
  console.log(req.query['access_token'])
  const profile = await getProfileFromAccessToken(req.query['access_token']);

  let user = await User.findOrCreate({
    where: {
      facebookId: profile.id
    },
    defaults: {
      facebookId: profile.id,
      email: randomString(20),
      password: randomString(20),
    }
  });

  return res.send(user);
});

module.exports = router;