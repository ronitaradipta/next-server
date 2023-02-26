const express = require('express');
const AuthController = require('../../controllers/Authenticate');

const router = express.Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.get('/logout', AuthController.Logout);
router.post('/verify-otp', AuthController.VerifyOtp);

module.exports = router;
