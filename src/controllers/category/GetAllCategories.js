const { ProductCategory } = require('../../models');

module.exports = async (req, res) => {
  try {
    const category = await ProductCategory.findAll();

    return res.status(200).send({
      message: 'success',
      data: category,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
