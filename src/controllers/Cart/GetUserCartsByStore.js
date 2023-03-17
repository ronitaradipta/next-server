const { Cart, Product, ProductGalleries, Store } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.userId;
  const storeId = req.params.storeId;

  try {
    const cartItems = await Cart.findAll({
      where: { userId: userId },
      attributes: ['id', 'productId', 'userId', 'quantity'],
      include: [
        {
          model: Product,
          as: 'product',
          where: { storeId },
          attributes: ['id', 'name', 'price', 'storeId', 'stock'],
          include: [
            { model: ProductGalleries, attributes: ['image'] },
            {
              model: Store,
              as: 'store',
              attributes: ['id', 'name', 'image', 'city'],
            },
          ],
        },
      ],
    });

    const totalPrice = cartItems.reduce((acc, cart) => {
      return acc + cart.product.price * cart.quantity;
    }, 0);

    const dataCart = {
      products: cartItems,
      totalItems: cartItems.length,
      totalPrice,
    };

    return res.status(200).send({
      message: 'success',
      data: cartItems.length === 0 ? 'empty cart' : dataCart,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
