const router = require('express').Router();
const { register, login } = require('../controllers/user');
const { validateUserLogin, validateUserRegister } = require('../middlewares/user');

router.post('/register', validateUserRegister, register);
router.post('/login', validateUserLogin, login);

module.exports = router;

