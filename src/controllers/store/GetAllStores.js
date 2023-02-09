const { Store, User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const store = await Store.findAll({
      attributes: ['id', 'name', 'description', 'city', 'status', 'userId'],
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    return res.status(200).send({
      message: 'success',
      data: store,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
