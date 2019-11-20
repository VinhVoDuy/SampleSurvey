const router = require('express').Router();
const redirectToLoginPage = require('../middlewares/redirectToLoginPage');
const { loginSucess, loginByAccessToken } = require('../controllers/auth-facebook');
const validateAccessToken = require('../middlewares/validateAccessToken');

router.get('/', redirectToLoginPage);
router.get('/success', loginSucess);
router.get('/access_token', validateAccessToken, loginByAccessToken);

module.exports = router;