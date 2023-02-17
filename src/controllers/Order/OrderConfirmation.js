const { Order, Product, Store, OrderDetails } = require('../../models');

module.exports = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findOne(orderId, {
      include: {
        model: OrderDetails,
        include: {
          model: Product,
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
    const totalPrice = order.orderDetails.reduce((total, orderDetail) => {
      const productPrice = orderDetail.product.price;
      const quantity = orderDetail.quantity;
      return total + productPrice * quantity;
    }, 0);

    await Store.update(
      { nextCoinBalance: sequelize.literal(`balance + ${totalPrice}`) },
      { where: { id: order.sellerId } }
    );

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
