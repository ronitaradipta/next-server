const { Order } = require('../../models');

module.exports = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { trackingNumber } = req.body;
    const order = await Order.findByPk(orderId);

    if (order.storeId !== req.user.storeId) {
      return res.status(401).send({ message: 'Unauthorized request' });
    }

    await order.update({
      trackingNumber: trackingNumber,
      shippingStatus: 'in_progress',
    });

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
