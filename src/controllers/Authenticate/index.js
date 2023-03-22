const Register = require('./Register');
const Login = require('./Login');
const Logout = require('./Logout');
const VerifyOtp = require('./VerifyOtp');
const ForgotPassword = require('./ForgotPassword');
const ResetPassword = require('./ResetPassword');
const verifyToken = require('./verifyToken');
const RefreshToken = require('./RefreshToken');
module.exports = {
  Register,
  Login,
  Logout,
  VerifyOtp,
  ForgotPassword,
  ResetPassword,
  verifyToken,
  RefreshToken,
};
