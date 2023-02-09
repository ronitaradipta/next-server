const { Product } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { name, description, price, stock, storeId, categoryId } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      storeId,
      categoryId,
    });

    return res.status(201).send({
      message: 'successfully created',
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
