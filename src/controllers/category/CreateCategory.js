const { ProductCategory, media } = require('../../models');
const createSlug = require('../../utils/createSlug');

module.exports = async (req, res) => {
  try {
    const image = `${req.protocol}://${req.get('host')}/${req.formatWebp}`;
    const { name } = req.body;
    const slug = createSlug(name);

    const img = await media.create({ file: image });
    console.log(img);

    const category = await ProductCategory.create({
      name,
      image: img.file,
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
