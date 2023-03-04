const { User, user_profile } = require('../../models');
const bcrypt = require('bcrypt');
const randomAvatar = require('../../utils/createAvatar');
module.exports = async (req, res) => {
  try {
    // variable define
    const { name, email, password, passwordConfirm } = req.body;

    // input field cannot be null
    if (req.body === null) return res.status(500).send(error);

    // password match check
    if (password !== passwordConfirm)
      return res.status(500).send({ message: 'Password tidak sesuai' });

    // email existance check
    const isEmail = await User.findOne({
      where: { email: email },
      attributes: ['id', 'name', 'email', 'password'],
    });
    if (isEmail)
      return res.status(500).send({ message: 'Email telah terdaftar' });

    // Password Encryption
    const salt = await bcrypt.genSalt();
    const HashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name: name,
      email: email,
      password: HashPassword,
    });
    await user_profile.create({
      userId: user.id,
      avatar: randomAvatar(),
    });

    res.status(201).send({ message: 'Registrasi Berhasil, Silahkan Login' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
