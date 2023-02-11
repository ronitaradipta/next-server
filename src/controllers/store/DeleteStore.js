const { Store } = require('../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findOne({
      where: { id: id },
      attributes: ['name', 'description', 'city', 'status'],
    });

    if (!store) {
      return res.status(404).send({ message: 'Store not found' });
    }

    await Store.destroy({ where: { id } });

    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
