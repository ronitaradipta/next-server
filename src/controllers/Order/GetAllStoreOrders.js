const { Order, OrderDetails } = require('../../models');

module.exports = async (req, res) => {
  try {
    const storeId = req.user.storeId;

    const orders = await Order.findAll({
      where: { storeId },
      include: [{ model: OrderDetails }],
    });

    return res.status(200).send({
      message: 'success',
      data: orders,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
