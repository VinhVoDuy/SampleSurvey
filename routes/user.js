const router = require('express').Router();
const { register, login, facebookLogin } = require('../controllers/user');
const { validateUserLogin, validateUserRegister } = require('../middlewares/validateUser');

router.post('/register', validateUserRegister, register);
router.post('/login', validateUserLogin, login);
router.get('/facebook-login', facebookLogin);
router.get('/', async (req, res) => {
  res.send(req.user);
})

module.exports = router;

