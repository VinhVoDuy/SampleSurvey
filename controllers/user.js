const { User } = require('../models');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../services/user/generateToken');
const hashPassword = require('../services/user/hashPassword');

module.exports = {
  register: async (req, res) => {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send('Email has been registered.');

    const hashed = await hashPassword(req.body.password);

    user = await User.create({
      email: req.body.email,
      password: hashed,
      isAdmin: req.body.isAdmin || null
    });

    return res.send(user);
  },

  login: async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("Email or password is invalid.");

    const isPasswd = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswd) return res.status(400).send("Email or password is invalid.");

    const token = generateAuthToken(user);

    return res.send(token);
  },

  facebookLogin: async (req, res) => {
    const token = generateAuthToken(req.user);

    return res.send(token);
  }
}