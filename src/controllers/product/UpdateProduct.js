const { Product, ProductGalleries } = require('../../models');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.findOne({
      where: { id: id },
      attributes: ['name', 'description', 'price', 'stock', 'categoryId'],
    });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    await Product.update(
      {
        name,
        description,
        price,
        stock,
        categoryId,
      },
      {
        where: { id },
      }
    );

    const images = await ProductGalleries.findAll({
      where: {
        productId: req.params.id,
      },
    });

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
