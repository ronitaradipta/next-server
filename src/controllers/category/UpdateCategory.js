const { ProductCategory } = require('../../models');
const createSlug = require('../../utils/createSlug');
const { addMedia } = require('../media/media');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const slug = createSlug(name);

    const media = await addMedia(req, res);

    await ProductCategory.update(
      {
        name,
        image: media.file,
        slug,
      },
      { where: { id } }
    );

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
