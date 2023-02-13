const express = require('express');
const cartController = require('../../controllers/Cart');
const { isAuthenticate } = require('../../middleware/Authenticate');

const router = express.Router();

router.post('/add', isAuthenticate, cartController.addToCart);
router.get('/product', isAuthenticate, cartController.GetUserCarts);
router.put('/:id', isAuthenticate, cartController.UpdateCart);
router.delete('/:id', isAuthenticate, cartController.DeleteCart);

module.exports = router;
