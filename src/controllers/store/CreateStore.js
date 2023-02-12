const { Store } = require('../../models');

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

    const store = await Store.create({
      userId,
      name,
      description,
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
