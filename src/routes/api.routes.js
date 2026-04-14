const express = require('express');
const router = express.Router();

const otpController = require('../controllers/otp.controller');
const webhookController = require('../controllers/webhook.controller');

// OTP Routes
router.post('/otp/generate', otpController.generateOtp);
router.post('/otp/verify', otpController.verifyOtp);

// Webhook Route
router.post('/webhook', webhookController.handleWebhook);

module.exports = router;
