const express = require('express');
const Order = require('../../controllers/Order');
const { isAuthenticate } = require('../../middleware/Authenticate');

const router = express.Router();

router.post('/checkout/:id', isAuthenticate, Order.CreateOrder);
router.put('/tracking-update/:id', isAuthenticate, Order.updateTrackingNumber);
router.get('/store', isAuthenticate, Order.GetAllStoreOrders);

module.exports = router;
