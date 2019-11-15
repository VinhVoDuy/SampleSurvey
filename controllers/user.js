const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../services/user/generateToken');

module.exports = {
  register: async (req, res) => {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send('Email has been registered.');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      email: req.body.email,
      password: hash,
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
  }
}