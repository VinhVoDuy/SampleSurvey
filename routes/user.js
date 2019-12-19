const router = require("express").Router();
const auth = require("../middlewares/validateToken");
const register = require('../controllers/user/register');
const login = require('../controllers/user/login');
const loginAdmin = require('../controllers/user/loginAdmin');
const facebookLogin = require('../controllers/user/facebookLogin');
const getAllAdmins = require("../controllers/user/getAllAdmins");
const registerAdmin = require('../controllers/user/registerAdmin');
const deleteAdmin = require('../controllers/user/deleteAdmin');
const {
  validateUserLogin,
  validateUserRegister
} = require("../middlewares/validateUser");
const validateAdmin = require("../middlewares/validateAdmin");

router.post("/register", validateUserRegister, register);
router.post("/login", validateUserLogin, login);
router.post("/login/admin", validateUserLogin, loginAdmin);
router.get("/facebook-login", facebookLogin);
router.get("/admin", [auth, validateAdmin], getAllAdmins);
router.post("/admin", [auth, validateAdmin, validateUserRegister], registerAdmin);
router.delete("/admin/:id", [auth, validateAdmin], deleteAdmin);

module.exports = router;
