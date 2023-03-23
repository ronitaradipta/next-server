const { Store } = require('../../models');
const removeCloudinaryImage = require('../../utils/removeCloudinaryImage');

module.exports = async (req, res) => {
  try {
    const { name, description, city, status } = req.body;
    const image = req.file?.path;

    const store = await Store.findOne({
      where: { userId: req.user.userId },
      attributes: [
        'id',
        'name',
        'description',
        'image',
        'city',
        'status',
        'userId',
      ],
    });

    if (!store) {
      return res.status(404).send({ message: 'Store not found' });
    }

    if (req.user.userRole !== 'Admin') {
      if (store.userId !== req.user.userId) {
        return res.status(401).send({ message: 'Unauthorized request' });
      }
    }

    if (image) {
      if (store.image) {
        removeCloudinaryImage(store.image);
      }
    }

    await store.update({
      name,
      description,
      image,
      city,
      status,
    });

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
