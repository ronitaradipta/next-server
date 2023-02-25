const { User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(404).send({ message: 'Unkown Data Users' });
    }

    await User.destroy({ where: { id } });

    return res.status(200).send({
      message: 'User has Been Deleted',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
