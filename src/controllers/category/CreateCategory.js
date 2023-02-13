const { ProductCategory } = require('../../models');
const createSlug = require('../../utils/createSlug');
const { addMedia } = require('../media/media');

module.exports = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = createSlug(name);

    const media = await addMedia(req, res);

    const category = await ProductCategory.create({
      name,
      image: media.file,
      slug,
    });

    return res.status(201).send({
      message: 'successfully created',
      data: category,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
