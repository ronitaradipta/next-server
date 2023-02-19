const { ProductCategory } = require('../../models');
const createSlug = require('../../utils/createSlug');
const removeImageFromStorage = require('../../utils/removeImageFromStorage');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = `${req.protocol}://${req.get('host')}/${req.formatWebp}`;

    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    removeImageFromStorage('images', category.image);

    const slug = createSlug(name);

    await category.update({
      name,
      image: image,
      slug,
    });

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
