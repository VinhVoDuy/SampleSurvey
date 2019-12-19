const bcrypt = require("bcrypt");
const { User } = require("../../models");
const generateAuthToken = require("../../services/user/generateToken");

module.exports = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Email or password is invalid.");

  const isPasswd = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswd) return res.status(400).send("Email or password is invalid.");

  const token = generateAuthToken(user);

  return res.send(token);
}