const { User } = require('../../models');
const makeRandomPassword = require('../../utils/makeRandomPassword');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { name, email } = req.body;
    const password = makeRandomPassword(8);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      message: 'successfully created',
      data: user,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
