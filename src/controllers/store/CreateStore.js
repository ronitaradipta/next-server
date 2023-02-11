const { Store } = require('../models');

module.exports = async (req, res) => {
  try {
    const { userId, name, description, city, status } = req.body;

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
