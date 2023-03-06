const { User, user_profile } = require('../../models');

module.exports = async (req, res) => {
  try {
    const avatar = req.file?.path;
    const { name, email, birth_day, phone_number, gender } = req.body;

    const user = await User.findOne({
      where: { id: req.user.userId },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: user_profile,
          attributes: ['avatar', 'birth_day', 'gender', 'phone_number'],
        },
      ],
    });
    if (user) {
      if (name !== user.name) {
        user.name = name;
        await user.save();
        return res.status(200).send({ message: `Nama berhasil di update` });
      }
      if (email !== user.email) {
        user.email = email;
        await user.save();
        return res.status(200).send({ message: `Email berhasil di update` });
      }
    }

    const userProfile = await user_profile.findOne({
      where: { userId: req.user.userId },
    });
    if (userProfile) {
      if (birth_day !== userProfile.birth_day && birth_day !== '') {
        userProfile.birth_day = birth_day;
        await userProfile.save();
        return res
          .status(200)
          .send({ message: `Tanggal Lahir berhasil di update` });
      }
      if (gender !== userProfile.gender) {
        userProfile.gender = gender;
        await userProfile.save();
        return res
          .status(200)
          .send({ message: `Jenis Kelamin berhasil di update` });
      }
      if (phone_number !== userProfile.phone_number) {
        userProfile.phone_number = phone_number;
        await userProfile.save();
        return res
          .status(200)
          .send({ message: `Nomor Telepon berhasil di update` });
      }
      if (avatar !== userProfile.avatar && avatar !== '') {
        userProfile.avatar = avatar;
        await userProfile.save();
        return res.status(200).send({ message: `Avatar berhasil di update` });
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
