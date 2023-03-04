const {
  Product,
  Store,
  ProductCategory,
  ProductGalleries,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id: id },
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
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name', 'image', 'city'],
        },
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
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        averageRatings: product.averageRatings,
        totalReview: product.totalReview,
        storeId: product.store.id,
        storeName: product.store.name,
        storeCity: product.store.city,
        storeImage: product.store.image,
        categoryName: product.category.name,
        categoryImage: product.category.image,
        images: product.ProductGalleries,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
