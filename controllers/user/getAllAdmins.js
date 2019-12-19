const { User } = require("../../models");

module.exports = async (req, res) => {
  const admins = await User.findAll({ where: { isAdmin: true } });

  return res.send(admins);
}
