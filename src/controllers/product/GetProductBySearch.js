const {
  Product,
  Store,
  ProductCategory,
  ProductGalleries,
} = require('../../models');

const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const { search } = req.query;

    const product = await Product.findOne({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      },
      attributes: ['name', 'description', 'price', 'stock'],
      include: [
        { model: Store, as: 'store', attributes: ['name', 'city'] },
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['name', 'image'],
        },
        {
          model: ProductGalleries,
          attributes: ['image'],
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
