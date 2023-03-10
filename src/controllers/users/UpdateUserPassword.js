const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!(oldPassword && newPassword && confirmPassword)) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    const user = await User.findByPk(req.user.userId);
    const match = await bcrypt.compare(oldPassword, user.password);

    if (newPassword !== confirmPassword)
      return res.status(400).send({ message: 'Password does not match' });

    if (!match)
      return res.status(400).send({ message: 'Old password is wrong' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedPassword },
      {
        where: { id: req.user.userId },
      }
    );
    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
