const express = require('express');
const productReviewController = require('../../controllers/ProductReview');
const { isAuthenticate } = require('../../middleware/Authenticate');

const router = express.Router();

router.post('/', isAuthenticate, productReviewController.CreateReview);
router.get('/:id', productReviewController.GetProductReviews);
router.put('/update/:id', isAuthenticate, productReviewController.UpdateReview);

module.exports = router;
