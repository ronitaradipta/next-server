const { User, Role, Store } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: email },
    attributes: ['id', 'name', 'email', 'password'],
    include: [
      { model: Role, attributes: ['id', 'name'] },
      { model: Store, attributes: ['id', 'name', 'city'] },
    ],
  });

  // email existance check
  if (!user) return res.status(403).json({ msg: 'Email is not Exist' });

  // password match checking
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: 'Password is Wrong' });

  const userId = user.id;
  const userEmail = user.email;
  const userRole = user.Role.dataValues.name;
  const storeId = user.Store.dataValues.id;

  //   generating access token as cookies for authentication
  const AccessToken = jwt.sign(
    { userId, userEmail, userRole, storeId },
    process.env.ACCESS_TOKEN,
    { expiresIn: '24h' }
  );

  return res
    .status(200)
    .cookie('AccessToken', AccessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 Hours / 1 Days expired
      secure: true,
    })
    .send({
      message: 'Login is Success',
      data: {
        userId,
        userEmail,
        AccessToken,
      },
    });
};
