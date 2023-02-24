const { Product, ProductGalleries, sequelize } = require('../../models');

module.exports = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const product = await Product.findOne({
      where: { id: id },
      attributes: [
        'id',
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

    await product.update(
      {
        name,
        description,
        price,
        stock,
        categoryId,
      },
      { transaction: t }
    );

    const images = await ProductGalleries.findAll({
      where: {
        productId: req.params.id,
      },
    });

    await ProductGalleries.destroy(
      {
        where: {
          productId: req.params.id,
        },
      },
      { transaction: t }
    );

    const newImages = req.files.map((file) => ({
      image: file.path,
      productId: id,
    }));

    await ProductGalleries.bulkCreate(newImages, { transaction: t });

    await t.commit();

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
};
