const { Survey } = require('../../models');

module.exports = async (req, res) => {
    await Survey.destroy({ where: { id: req.params.id } });

    res.send("Deleted survey successfully.");
  }