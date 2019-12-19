const { User } = require("../../models");

module.exports = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });

  return res.send("Deleted user admin successfully.");
}