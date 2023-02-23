const {
  Order,
  Cart,
  Product,
  OrderDetails,
  sequelize,
} = require('../../models');
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

  const t = await sequelize.transaction();
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

    const totalPrice = carts.reduce((acc, cart) => {
      return acc + cart.product.price * cart.quantity;
    }, 0);

    const amountToPay = totalPrice + shippingCost;

    const order = await Order.create(
      {
        userId,
        storeId: parseInt(storeId),
        totalPrice,
        shippingCost,
        amountToPay,
        customerAddress: `${address}, ${regency}, ${city}, ${province} - ${zipcode}`,
        customerDetail: `${name} (${phone})`,
      },
      { transaction: t }
    );

    // create transaction token and url from midtrans
    const parameters = {
      transaction_details: {
        order_id: order.orderNumber,
        gross_amount: order.amountToPay,
      },
      customer_details: {
        email: email,
        phone: phone,
      },
    };

    const transaction = await snap.createTransaction(parameters);

    // delete cart after checkout completes
    carts.forEach(async (cart) => {
      await OrderDetails.create({
        orderId: order.id,
        productId: cart.productId,
        quantity: cart.quantity,
        price: cart.product.price,
      });

      // decrease product stock when customer successfully creates a new order
      await Product.decrement(
        'stock',
        { by: cart.quantity, where: { id: cart.product.id } },
        { transaction: t }
      );

      cart.destroy();
    });

    await t.commit();

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
    await t.rollback();
    return res.status(500).send(error.message);
  }
};
