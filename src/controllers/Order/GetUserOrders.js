const {
  Order,
  OrderDetails,
  Product,
  ProductGalleries,
  Store,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit, page } = req.query;
    const dataPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;

    if (!userId) {
      return res.status(400).send({ error: 'Invalid user id' });
    }

    const orders = await Order.findAndCountAll({
      limit: dataPerPage,
      offset: (currentPage - 1) * dataPerPage,
      where: { userId },
      attributes: [
        'id',
        'orderNumber',
        'userId',
        'storeId',
        'customerAddress',
        'customerDetail',
        'totalPrice',
        'shippingCost',
        'amountToPay',
        'orderStatus',
        'shippingStatus',
        'trackingNumber',
      ],
      include: [
        {
          model: OrderDetails,
          attributes: ['quantity', 'price'],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
              include: [
                { model: ProductGalleries, attributes: ['image'] },
                {
                  model: Store,
                  as: 'store',
                  attributes: ['id', 'name', 'image', 'city'],
                },
              ],
              distinct: true,
            },
          ],
          distinct: true,
        },
      ],
      distinct: true,
    });

    if (orders.count === 0) {
      return res.status(404).send({ message: 'Transactions not found' });
    }

    // calculate total page needed
    const totalPages = Math.ceil(orders.count / dataPerPage);

    return res.status(200).send({
      message: 'success',
      data: orders.rows,
      totalData: orders.count,
      currentPage,
      dataPerPage,
      totalPages,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
