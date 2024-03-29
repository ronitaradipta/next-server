const {
  User,
  Role,
  Store,
  Otp,
  user_profile,
  refreshtoken,
} = require('../../models');
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
        {
          model: user_profile,
          attributes: ['phone_number', 'birth_day', 'gender', 'avatar'],
        },
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
    const userName = user.name;
    const userEmail = user.email;
    const userRole = user.Role.name;
    const storeId = user.Store?.id;
    const storeName = user.Store?.name;
    const userAvatar = user.user_profile.avatar;

    const AccessToken = jwt.sign(
      { userId, userName, userEmail, userRole, storeId, storeName, userAvatar },
      process.env.ACCESS_TOKEN,
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { userId, userName, userEmail, userRole, storeId, storeName, userAvatar },
      process.env.REFRESH_TOKEN,
      { expiresIn: '48h' }
    );

    const refreshTokenData = await refreshtoken.findOne({
      where: { userId: user.id },
    });

    if (refreshTokenData) {
      await refreshTokenData.update({ token: refreshToken });
    } else {
      await refreshtoken.create({ userId: user.id, token: refreshToken });
    }

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: 'Login is Success',
      data: {
        token: AccessToken,
        user: {
          userId,
          userName,
          userEmail,
          userRole,
          storeId,
          storeName,
          userAvatar,
        },
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
