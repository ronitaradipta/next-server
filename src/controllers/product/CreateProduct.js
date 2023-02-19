const sharp = require('sharp');
const { Product, ProductGalleries } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.user.storeId;

    const { name, description, price, stock, categoryId } = req.body;

    if (req.files.length === 0) {
      return res
        .status(400)
        .send({ error: 'You must upload at least 1 image' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      storeId: id,
      categoryId,
    });

    // mapping the array of images from payload
    const images = req.files.map((file) => ({
      image: `${req.protocol}://${req.get('host')}/${file.filename}`,
      productId: product.id,
    }));

    await ProductGalleries.bulkCreate(images);

    return res.status(201).send({
      message: 'successfully created',
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
