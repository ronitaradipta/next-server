const { Product, Store, ProductGalleries } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findOne({ where: { id } });

    const { name, description, price, stock, categoryId } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      storeId: store.id,
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
