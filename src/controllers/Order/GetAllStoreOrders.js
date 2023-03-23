const {
  Order,
  OrderDetails,
  Product,
  ProductGalleries,
  Store,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const storeId = req.user.storeId;
    const { limit, page } = req.query;
    const dataPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;

    if (!storeId) {
      return res.status(400).send({ error: "You don't have a store" });
    }

    const orders = await Order.findAndCountAll({
      limit: dataPerPage,
      offset: (currentPage - 1) * dataPerPage,
      where: { storeId },
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

    // calculate total page needed
    const totalPages = Math.ceil(orders.count / dataPerPage);

    const totalPending = orders.rows.filter((order) => {
      return order.shippingStatus === 'new';
    });

    return res.status(200).send({
      message: 'success',
      data: orders.rows,
      totalData: orders.count,
      currentPage,
      dataPerPage,
      totalPages,
      statusPending: totalPending.length,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
