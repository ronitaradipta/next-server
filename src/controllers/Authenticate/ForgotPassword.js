const { User } = require("../../models");
const ResetPasswordToken = require("../../utils/ResetPasswordToken");
const sendEmail = require("../../utils/sendEmail");

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) return res.status(401).send({ msg: `Email is not registered` });
  // Get ResetPassword Token
  const resetToken = ResetPasswordToken(user);

  // Generate Link for password reset
  const passwordResetURL = `${req.protocol}://${req.get("host")}/auth/reset/${resetToken}`;

  // generate message for Email content
  const message = `Your password recovery Link is :  \n\n ${passwordResetURL} \n\n If you have not requested this email then, please ignore it.`;

  try {
    // send reset token to email
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).send({
      success: true,
      message: `Password Recovery Link has been sent to ${user.email},  please check your email`,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
