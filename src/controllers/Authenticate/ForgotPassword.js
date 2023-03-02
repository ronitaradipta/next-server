const { User } = require("../../models");
const ResetPasswordToken = require("../../utils/ResetPasswordToken");
const sendEmail = require("../../utils/sendEmail");
const getTemplate = require("../../utils/emailTemplate");

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) return res.status(401).send({ msg: `Email Kamu belum terdaftar` });
  // Get ResetPassword Token
  const resetToken = ResetPasswordToken(user);

  // Generate Link for password reset
  const passwordResetURL = `${process.env.BASE_URL}/reset-password/${resetToken}`;

  // generate message for Email content
  const message = getTemplate({ user, passwordResetURL });
  try {
    // send reset token to email
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).send({
      success: true,
      msg: `Password Recovery Link has been sent to ${user.email}`,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
