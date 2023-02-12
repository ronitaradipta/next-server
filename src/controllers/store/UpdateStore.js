const { Store } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, city, status } = req.body;
    const store = await Store.findOne({
      where: { id: id },
      attributes: ['name', 'description', 'city', 'status', 'userId'],
    });
    if (!store) {
      return res.status(404).send({ message: 'Store not found' });
    }

    if (req.user.userRole !== 'Admin') {
      if (store.userId !== req.user.userId) {
        return res.status(401).send({ message: 'Unauthorized request' });
      }
    }

    await Store.update(
      {
        name,
        description,
        city,
        status,
      },
      {
        where: { id },
      }
    );

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
