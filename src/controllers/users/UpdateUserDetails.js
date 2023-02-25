const { User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { email, name } = req.body;

    const isEmail = await User.findOne({ where: { email: email } });
    if (isEmail) return res.status(500).send({ msg: 'Email is already exist' });
    await User.update(
      { name: name, email: email },
      {
        where: { id: req.user.userId },
      }
    );
    return res.status(200).send({
      message: 'Profile detail is updated',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
