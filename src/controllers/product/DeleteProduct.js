const { Product, ProductGalleries, sequelize } = require('../../models');

module.exports = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    await ProductGalleries.destroy(
      { where: { productId: id } },
      { transaction: t }
    );

    const product = await Product.findOne({
      where: { id: id },
      attributes: [
        'name',
        'description',
        'price',
        'stock',
        'storeId',
        'categoryId',
      ],
    });

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    if (req.user.userRole !== 'Admin') {
      if (product.storeId !== req.user.storeId) {
        return res.status(401).send({ message: 'Unauthorized request' });
      }
    }

    await Product.destroy({ where: { id } }, { transaction: t });

    await t.commit();

    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
};
