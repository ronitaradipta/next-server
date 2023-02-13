const {
  Product,
  Store,
  ProductCategory,
  ProductGalleries,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const { category } = req.query;

    const cat = await ProductCategory.findOne({
      where: { slug: category },
    });

    const product = await Product.findAll({
      where: { categoryId: cat.id },
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'stock',
        'averageRatings',
        'totalReview',
      ],
      include: [
        { model: Store, as: 'store', attributes: ['name', 'city'] },
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['name', 'image', 'slug'],
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
