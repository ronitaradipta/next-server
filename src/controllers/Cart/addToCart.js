const { Cart } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    let cartItem = await Cart.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (cartItem) {
      await cartItem.update({
        quantity: cartItem.quantity + quantity,
      });
    } else {
      cartItem = await Cart.create({
        productId,
        userId,
        quantity,
      });
    }

    return res.status(200).send({
      message: 'Product added to cart',
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
