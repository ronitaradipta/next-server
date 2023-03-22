const express = require('express');
const AuthController = require('../../controllers/Authenticate');

const router = express.Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.post('/logout', AuthController.Logout);
router.post('/verify-otp', AuthController.VerifyOtp);
router.post('/forgot', AuthController.ForgotPassword);
router.get('/verify/:token', AuthController.verifyToken);
router.put('/reset/:token', AuthController.ResetPassword);
router.get('/refresh-token', AuthController.RefreshToken);
module.exports = router;
