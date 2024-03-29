const {
  Cart,
  Product,
  ProductGalleries,
  Store,
  Sequelize,
} = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cartItems = await Cart.findAll({
      where: { userId: userId },
      attributes: ['id', 'productId', 'userId', 'quantity'],
      include: [
        {
          model: Product,
          as: 'product',
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
      order: [[Sequelize.literal('`product.store.name`'), 'ASC']],
    });

    const dataCart = {
      products: cartItems,
      totalItems: cartItems.length,
    };

    return res.status(200).send({
      message: 'success',
      data: cartItems.length === 0 ? 'empty cart' : dataCart,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
