const { Product, Store } = require('../models');

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

    return res.status(201).send({
      message: 'successfully created',
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
