const { Product } = require('../../modelsmodels');

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

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
