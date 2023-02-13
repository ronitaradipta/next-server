const { ProductReview, Product } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, rating, comment } = req.body;
    const userId = req.user.userId;

    const review = await ProductReview.findByPk(id);
    if (review.userId !== userId) {
      return res
        .status(403)
        .send({ error: 'You are not authorized to edit this review' });
    }

    review.update({
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

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
