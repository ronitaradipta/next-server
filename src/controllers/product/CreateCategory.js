const { ProductCategory } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await ProductCategory.create({
      name,
    });

    return res.status(201).send({
      message: 'successfully created',
      data: category,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
