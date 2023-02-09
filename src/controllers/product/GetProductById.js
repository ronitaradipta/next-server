const { Product, Store, ProductCategory } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id: id },
      attributes: ['name', 'description', 'price', 'stock'],
      include: [
        { model: Store, as: 'store', attributes: ['name', 'city'] },
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['name', 'image'],
        },
      ],
    });

    if (!product) {
      return res.status(404).send({
        message: 'Product not found',
      });
    }

    return res.status(200).send({
      message: 'success',
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
