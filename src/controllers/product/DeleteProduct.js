const { Product, ProductGalleries } = require('../../models');

const removeImageFromStorage = require('../../utils/removeImageFromStorage');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await ProductGalleries.findAll({ where: { productId: id } });

    await ProductGalleries.destroy({ where: { productId: id } });

    //delete images from folder images
    images.forEach(async (image) => {
      removeImageFromStorage('images', image.image);
    });

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

    await Product.destroy({ where: { id } });

    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
