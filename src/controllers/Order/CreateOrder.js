const { Order, Cart, Product, OrderDetails } = require('../../models');
const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

module.exports = async (req, res) => {
  const userId = req.user.userId;
  const storeId = req.params.id;
  const {
    shippingCost,
    address,
    regency,
    city,
    province,
    zipcode,
    name,
    email,
    phone,
  } = req.body;

  try {
    const carts = await Cart.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Product,
          as: 'product',
          where: { storeId: storeId },
          attributes: ['id', 'name', 'price', 'storeId'],
        },
      ],
    });

    if (!carts || carts.length === 0) {
      return res.status(404).send({
        message: 'No items in cart',
      });
    }

    const total = carts.reduce((acc, cart) => {
      return acc + cart.product.price * cart.quantity + shippingCost;
    }, 0);

    const order = await Order.create({
      userId,
      storeId: parseInt(storeId),
      shippingCost,
      totalPrice: total,
      customerAddress: `${address}, ${regency}, ${city}, ${province} - ${zipcode}`,
      customerDetail: `${name} (${phone})`,
    });

    // create transaction token and url from midtrans
    const parameters = {
      transaction_details: {
        order_id: order.orderNumber,
        gross_amount: order.totalPrice,
      },
      customer_details: {
        email: email,
        phone: phone,
      },
    };

    const transaction = await snap.createTransaction(parameters);

    carts.forEach(async (cart) => {
      await OrderDetails.create({
        orderId: order.id,
        productId: cart.productId,
        quantity: cart.quantity,
        price: cart.product.price,
      });

      cart.destroy();
    });

    return res.status(200).send({
      message: 'Order placed successfully',
      data: [
        order,
        {
          transactionToken: transaction.token,
          transactionUrl: transaction.redirect_url,
        },
      ],
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
