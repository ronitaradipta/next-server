const { Store, Product, ProductCategory } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'stock', 'categoryId'],
      include: [
        { model: Store, as: 'store', where: { id } },
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['name', 'image'],
        },
      ],
    });

    return res.status(200).send({
      message: 'success',
      data: products,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
