const { User, Role, Store, Otp, user_profile } = require('../../models');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const sendOtp = require('../../utils/sendOtp');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
      attributes: ['id', 'name', 'email', 'password'],
      include: [
        {
          model: user_profile,
          attributes: ['gender', 'phone_number', 'avatar', 'birth_day'],
        },
        { model: Role, attributes: ['id', 'name'] },
        { model: Store, attributes: ['id', 'name', 'city'] },
      ],
    });

    // email existance check
    if (!user) return res.status(403).json({ message: 'Email is not Exist' });

    // password match checking
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Password is Wrong' });

    // Generate OTP secret
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    });

    // Save OTP to database
    await Otp.create({
      userId: user.id,
      code: secret.base32,
      expiresAt: Date.now() + 120 * 1000,
    });

    // Send OTP to user's email
    await sendOtp(user.email, otp);
    return res
      .status(200)
      .send({ message: 'Check your email for OTP code', data: user.email });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
