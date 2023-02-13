const { Store } = require('../../models');
const { addMedia } = require('../media/media');

module.exports = async (req, res) => {
  try {
    const { name, description, city, status } = req.body;
    const userId = req.user.userId;

    const existingStore = await Store.findOne({
      where: { userId: userId },
    });

    if (existingStore) {
      return res.status(400).send({ message: 'User already has a store' });
    }

    const media = await addMedia(req, res);

    const store = await Store.create({
      userId,
      name,
      description,
      image: media.file,
      city,
      status,
    });

    return res.status(201).send({
      message: 'successfully created',
      data: store,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
