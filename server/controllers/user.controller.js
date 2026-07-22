const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const sendOtp = require("../utils/sendEmail");
require("dotenv").config();

const UserProfile = require("../models/userProfile.model");

const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("email role profileCompleted");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const profile = await UserProfile.findOne({
      user: id,
    });

    res.status(200).json({
      user,
      profile,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//password reset Otp
const sendOtpOnForReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendOtp.sendOtp(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true, // true in production with HTTPS
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

//logingOtp
const sendOtpOnForLogin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendOtp.sendOtpForLogin(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//sentOtp for Create User
const sendOtpOnForRegistration = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.trim() });

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User already exists!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendOtp.sendOtpForCreateUser(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//otp verification and create account
const otpVerificationAndRegistration = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify Otp
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({
      email,
      otp,
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < Date.now()) {
      await OTP.deleteOne({ email, otp });
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    await OTP.deleteOne({ email, otp });
    res.status(200).json({
      success: true,
      message: "OTP Verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const otpVerificationAndLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < Date.now()) {
      await OTP.deleteOne({ email, otp });
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    await OTP.deleteOne({ email, otp });
    const user = await User.findOne({ email });
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hasPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ email }, { password: hasPassword });

    res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (err) {
    res.status(500).json({ err_msg: "server error" });
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token found",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      },
    );

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { name, phone, gender } = req.body;

    let profile = await UserProfile.findOne({
      user: id,
    });

    if (!profile) {
      profile = await UserProfile.create({
        user: id,
        name,
        phone,
        gender,
      });
    } else {
      profile.name = name;
      profile.phone = phone;
      profile.gender = gender;

      await profile.save();
    }

    await User.findByIdAndUpdate(id, {
      profileCompleted: true,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  sendOtpOnForReset,
  sendOtpOnForLogin,
  verifyOTP,
  resetPassword,
  refresh,
  otpVerificationAndLogin,
  sendOtpOnForRegistration,
  otpVerificationAndRegistration,
  getProfile,
  updateProfile,
  logout,
};
