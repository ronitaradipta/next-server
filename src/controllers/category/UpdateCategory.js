const { ProductCategory } = require('../../models');
const createSlug = require('../../utils/createSlug');
const removeCloudinaryImage = require('../../utils/removeCloudinaryImage');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file.path;

    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    removeCloudinaryImage(category.image);

    const slug = createSlug(name);

    await category.update({
      name,
      image,
      slug,
    });

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
