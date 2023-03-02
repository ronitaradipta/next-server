const { User, Role, Store, Otp } = require('../../models');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      where: { email: email },
      attributes: ['id', 'name', 'email', 'password'],
      include: [
        { model: Role, attributes: ['id', 'name'] },
        { model: Store, attributes: ['id', 'name', 'city'] },
      ],
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const otp = await Otp.findOne({
      where: { userId: user.id, expiresAt: { [Op.gte]: new Date() } },
    });

    if (!otp) {
      return res.status(400).send({ message: 'OTP code is expired' });
    }
    console.log(otp);

    // Verify OTP token
    const isTokenValid = speakeasy.totp.verify({
      secret: otp.code,
      encoding: 'base32',
      token: code,
      window: 3,
    });

    if (!isTokenValid) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Delete used OTP
    await Otp.destroy({ where: { userId: user.id } });

    const userId = user.id;
    const userEmail = user.email;
    const userRole = user.Role.name;
    const storeId = user.Store?.id;
    const storeName = user.Store?.name;
    //   generating access token as cookies for authentication
    const AccessToken = jwt.sign(
      { userId, userEmail, userRole, storeId, storeName },
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
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
