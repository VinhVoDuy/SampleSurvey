const { User } = require("../../models");
const hashPassword = require("../../services/user/hashPassword");

module.exports = async (req, res) => {
  let user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("Email has been registered.");

  const hashed = await hashPassword(req.body.password);
  console.log(req.body);

  user = await User.create({
    email: req.body.email,
    password: hashed
  });

  return res.send(user);
}