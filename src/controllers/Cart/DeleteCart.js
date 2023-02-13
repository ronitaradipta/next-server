const { Cart } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
      });
    }

    if (cart.userId !== userId) {
      return res.status(401).json({
        error: 'Unauthorized access',
      });
    }

    await cart.destroy();

    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
