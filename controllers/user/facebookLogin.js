const generateAuthToken = require("../../services/user/generateToken");

module.exports = async (req, res) => {
  const token = generateAuthToken(req.user);

  return res.send(token);
}