const express = require("express");

const router = express.Router();

const {
  sendOtpOnForRegistration,
  otpVerificationAndRegistration,
  otpVerificationAndLogin,
  sendOtpOnForLogin,
  sendOtpOnForReset,
  verifyOTP,
  resetPassword,
  refresh,
  getProfile,
  updateProfile,
  logout,
} = require("../controllers/user.controller");
const { loginUserValidator } = require("../validators/user.validator");

const validate = require("../middleware/validate");
const authorize = require("../middleware/checkAuth");

// router.post("/create", loginUserValidator, validate, createUser);
router.post("/send-opt-registration", sendOtpOnForRegistration);
router.post("/opt-verification-register", otpVerificationAndRegistration);
router.post("/login", otpVerificationAndLogin);
router.post("/send-otp-reset", loginUserValidator, validate, sendOtpOnForReset);
router.post("/send-otp-login", sendOtpOnForLogin);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", loginUserValidator, validate, resetPassword);
router.post("/refresh", refresh);
router.get("/profile", authorize, getProfile);
router.put("/profile", authorize, updateProfile);
router.post("/logout", logout);

module.exports = router;
