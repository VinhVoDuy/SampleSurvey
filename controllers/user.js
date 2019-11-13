const db = require('../models');
const bcrypt = require('bcrypt');
const {
  validateUserRegister,
  validateUserLogin
} = require('../services/validates/user');

module.exports = {
  register: async (req, res) => {
    const { error } = validateUserRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send('Email has been registered.');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    user = await db.User.create({
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin || null
    });

    return res.send(user);
  },

  login: async (req, res) => {
    const { error } = ValidateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await db.User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is invalid.");

    const isPasswd = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswd) return res.status(400).send("Email or password is invalid.");

    const token = user.generateAuthToken();

    return res.send(token);
  }
}