const { Cart } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    if (cart.userId !== userId) {
      return res.status(401).send({ message: 'Unauthorized request' });
    }

    await Cart.update({ quantity }, { where: { id: id } });

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
