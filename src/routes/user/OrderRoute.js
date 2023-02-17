const express = require('express');
const Order = require('../../controllers/Order');
const { isAuthenticate } = require('../../middleware/Authenticate');

const router = express.Router();

router.post('/checkout/:id', isAuthenticate, Order.CreateOrder);

router.post('/notification', Order.NotificationTransaction);

router.put('/tracking-update/:id', isAuthenticate, Order.updateTrackingNumber);

router.put('/:id/confirm-order', isAuthenticate, Order.OrderConfirmation);

router.get('/store', isAuthenticate, Order.GetAllStoreOrders);

module.exports = router;
