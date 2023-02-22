const { ProductReview, Product, sequelize } = require('../../models');

module.exports = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    if (rating < 1 || rating > 5) {
      return res.status(400).send({ error: 'Rating must be between 1 and 5' });
    }

    const review = await ProductReview.findByPk(id, { transaction: t });
    if (review.userId !== userId) {
      await t.rollback();
      return res
        .status(403)
        .send({ error: 'You are not authorized to edit this review' });
    }

    await review.update(
      {
        productId: review.productId,
        rating,
        comment,
      },
      { transaction: t }
    );

    //calcutate the average rating and total review
    const reviews = await ProductReview.findAll({
      where: { productId: review.productId },
      transaction: t,
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
          id: review.productId,
        },
        transaction: t,
      }
    );

    await t.commit();

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
};
