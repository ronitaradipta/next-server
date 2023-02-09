const { ProductCategory } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    await ProductCategory.destroy({ where: { id } });

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
