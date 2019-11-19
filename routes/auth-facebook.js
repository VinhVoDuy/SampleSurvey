const router = require('express').Router();
const passport = require('passport');
const redirectToLoginPage = require('../middlewares/redirectToLoginPage');
const { loginSucess, loginByAccessToken } = require('../controllers/auth-facebook');
// router.get('/', passport.authenticate('facebook'));
// router.get('/callback',
//   passport.authenticate('facebook'),
//   (req, res) => {
//     res.redirect('/api/user/facebook-login');
//   })
router.get('/', redirectToLoginPage);
router.get('/success', loginSucess);
router.get('/access_token', loginByAccessToken);

module.exports = router;