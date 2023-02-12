const { Product, ProductGalleries } = require('../../models');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await ProductGalleries.findAll({ where: { productId: id } });

    await ProductGalleries.destroy({ where: { productId: id } });

    //delete images from folder images
    images.forEach(async (image) => {
      const static = image.dataValues.image.split('/').pop();
      const filePath = `images/${static}`;
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(error);
          return;
        }
      });
    });

    const product = await Product.findOne({
      where: { id: id },
      attributes: ['name', 'description', 'price', 'stock', 'categoryId'],
    });

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    await Product.destroy({ where: { id } });

    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
