const { Order, Product, Store, OrderDetails } = require('../../models');

module.exports = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findOne({
      where: { id: orderId },
      include: {
        model: OrderDetails,
        include: {
          model: Product,
          as: 'product',
          attributes: ['price'],
        },
      },
    });

    if (order.userId !== req.user.userId) {
      return res.status(401).send({ message: 'Unauthorized request' });
    }

    // update shipping delivery status
    await order.update({
      shippingStatus: 'delivered',
    });

    // update NextCoin Balance
    await Store.increment(
      { nextCoinBalance: order.totalPrice },
      { where: { id: order.storeId } }
    );

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
