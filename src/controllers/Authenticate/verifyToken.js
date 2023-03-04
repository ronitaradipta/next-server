const { resetPassword } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const user = await resetPassword.findOne({
      where: { resetToken: resetToken, ExpiresAt: { [Op.gte]: new Date() } },
    });
    if (!user) return res.status(400).send({ msg: "Reset Password Token is invalid or has been expired" });
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
  }
};
