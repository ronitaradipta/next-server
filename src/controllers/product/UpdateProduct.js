const { Product, ProductGalleries } = require('../../models');
const removeImageFromStorage = require('../../utils/removeImageFromStorage');

module.exports = async (req, res) => {
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

    await product.update({
      name,
      description,
      price,
      stock,
      categoryId,
    });

    const images = await ProductGalleries.findAll({
      where: {
        productId: req.params.id,
      },
    });

    //delete images from folder images
    images.forEach(async (image) => {
      removeImageFromStorage('images', image.image);
    });

    await ProductGalleries.destroy({
      where: {
        productId: req.params.id,
      },
    });

    const newImages = req.files.map((file) => ({
      image: `${req.protocol}://${req.get('host')}/${file.filename}`,
      productId: id,
    }));

    await ProductGalleries.bulkCreate(newImages);

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
