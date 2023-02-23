const { ProductReview } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await ProductReview.findAll({
      where: { productId: id },
    });

    if (reviews.length === 0) {
      return res.status(404).send({ error: 'No reviews found' });
    }

    return res.status(200).send({
      message: 'success',
      data: reviews,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
