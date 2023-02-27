const { ProductReview, Order, OrderDetails, Product } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.userId;

    if (rating < 1 || rating > 5) {
      return res.status(400).send({ error: 'Rating must be between 1 and 5' });
    }

    //check if user has already purchased product before review
    const order = await Order.findAll({
      where: {
        userId,
      },
      include: [{ model: OrderDetails, where: { productId } }],
      distinct: true,
    });

    if (!order.length) {
      return res.status(400).send({
        error: 'You must purchase the product before writing a review',
      });
    }

    // check if user has already reviewed the product
    const existingReviews = await ProductReview.count({
      where: {
        userId,
        productId,
      },
    });

    if (existingReviews >= 1) {
      return res.status(400).send({
        error:
          'You have reached the maximum limit of reviews for this product.',
      });
    }

    const review = await ProductReview.create({
      productId,
      userId,
      rating,
      comment,
    });

    //calcutate the average rating and total review
    const reviews = await ProductReview.findAll({
      where: { productId },
    });

    const totalReview = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRatings = totalReview / reviews.length;

    await Product.update(
      {
        averageRatings: avgRatings,
        totalReview: reviews.length,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    return res.status(201).send({
      message: 'successfully created',
      data: review,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
