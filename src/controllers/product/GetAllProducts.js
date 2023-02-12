const {
  Product,
  Store,
  ProductCategory,
  ProductGalleries,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    const product = await Product.findAll({
      limit: limit,
      offset: offset,
      attributes: ['id', 'name', 'description', 'price', 'stock'],
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

    return res.status(200).send({
      message: 'success',
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
