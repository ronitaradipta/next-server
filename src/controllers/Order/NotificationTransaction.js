const midtransClient = require('midtrans-client');
const { Order, OrderDetails, Product } = require('../../models');

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

module.exports = async (req, res) => {
  try {
    const statusResponse = await snap.transaction.notification(req.body);

    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    // Sample transactionStatus handling logic
    let orderStatus = '';
    if (transactionStatus == 'capture') {
      // capture only applies to card transaction, which you need to check for the fraudStatus
      if (fraudStatus == 'challenge') {
        // TODO set transaction status on your databaase to 'challenge'
        orderStatus = 'challenge';
      } else if (fraudStatus == 'accept') {
        // TODO set transaction status on your databaase to 'success'
        orderStatus = 'success';
      }
    } else if (transactionStatus == 'settlement') {
      orderStatus = 'success';
    } else if (transactionStatus == 'deny') {
      // TODO you can ignore 'deny', because most of the time it allows payment retries
      // and later can become success
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      // TODO set transaction status on your databaase to 'failure'
      orderStatus = 'failure';
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
      orderStatus = 'pending';
    }

    const order = await Order.findOne({
      where: { orderNumber: orderId },
      attributes: ['id', 'orderNumber', 'orderStatus'],
      include: [{ model: OrderDetails, attributes: ['quantity', 'productId'] }],
    });

    if (orderStatus === 'success') {
      order.update(
        { shippingStatus: 'new' },
        { where: { orderNumber: orderId } }
      );
    } else if (orderStatus === 'failure') {
      // restore product stock
      order.OrderDetails.forEach(async (item) => {
        const { productId, quantity } = item;
        const product = await Product.findByPk(productId, {
          attributes: ['id', 'name', 'price', 'stock', 'storeId'],
        });

        const newStock = product.stock + quantity;

        await product.update({ stock: newStock });
      });
    }

    order.update({ orderStatus: orderStatus });

    return res.status(200).send({
      message: 'Order status updated',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
