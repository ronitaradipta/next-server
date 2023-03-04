const crypto = require("crypto");
const { resetPassword } = require("../models");

module.exports = (user) => {
  // Generating Unique Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const expires = Date.now() + 10 * 60 * 1000; // 10 Minute expired

  // Hashing and adding unique token to database table
  resetPassword.create({ userId: user.id, resetToken: resetToken, ExpiresAt: expires }, { where: { email: user.email } });

  return resetToken;
};
