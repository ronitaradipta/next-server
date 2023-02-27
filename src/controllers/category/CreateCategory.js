const { ProductCategory } = require('../../models');
const createSlug = require('../../utils/createSlug');

module.exports = async (req, res) => {
  try {
    const image = req.file.path;
    const { name } = req.body;
    const slug = createSlug(name);

    const category = await ProductCategory.create({
      name,
      image,
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
