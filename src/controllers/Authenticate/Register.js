const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    // variable define
    const { name, email, password, passwordConfirm } = req.body;

    // input field cannot be null
    if (req.body === null) return res.status(500).send(error);

    // password match check
    if (password !== passwordConfirm)
      return res.status(500).send({ msg: 'Password is not match' });

    // email existance check
    const isEmail = await User.findOne({
      where: { email: email },
      attributes: ['id', 'name', 'email', 'password'],
    });
    if (isEmail) return res.status(500).send({ msg: 'Email is already exist' });

    // Password Encryption
    const salt = await bcrypt.genSalt();
    const HashPassword = await bcrypt.hash(password, salt);
    await User.create({
      name: name,
      email: email,
      password: HashPassword,
    });
    res.status(201).send({ msg: 'Registration Success' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
