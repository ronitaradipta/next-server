const { Store } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);

    if (!store) {
      return res.status(404).send({ message: 'Store not found' });
    }

    await store.destroy();

    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
