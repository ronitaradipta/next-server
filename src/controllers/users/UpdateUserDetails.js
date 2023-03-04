const { User, user_profile } = require('../../models');

module.exports = async (req, res) => {
  try {
    const avatar = req.file.path;
    const { name, email, birth_day, phone_number, gender } = req.body;

    const isEmail = await User.findOne({ where: { email: email } });
    if (isEmail && isEmail.id !== req.user.userId) {
      return res.status(500).send({ message: 'Email telah terpakai' });
    } else {
      await User.update(
        { email: email, name: name },
        { where: { id: req.user.userId } }
      );
    }
    // Find the user by ID and update the email field

    // Find the associated UserProfile object and update its fields
    const userProfile = await user_profile.findOne({
      where: { userId: req.user.userId },
    });
    if (!userProfile) {
      return res.status(404).send({ message: 'User Profile tidak ditemukan' });
    }
    await userProfile.update({
      birth_day,
      phone_number,
      gender,
      avatar,
    });

    return res.status(200).send({
      message: 'Informasi Profil Kamu berhasil diupdate',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
