const { Address } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Address.findByPk(id);
    if (!result) {
      return res
        .status(404)
        .send({ message: 'There is no address saved, try to add one' });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
