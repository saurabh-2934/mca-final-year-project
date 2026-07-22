const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendMail = async (to, subject, heading, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"QuickCart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2>${heading}</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px;">${otp}</h1>
          <p>This OTP is valid for <strong>10 minutes</strong>.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

const sendOtp = (email, otp) =>
  sendMail(email, "Password Reset OTP", "Password Reset", otp);

const sendOtpForLogin = (email, otp) =>
  sendMail(email, "Login OTP", "Login Verification", otp);

const sendOtpForCreateUser = (email, otp) =>
  sendMail(
    email,
    "New User Registration OTP",
    "Registration Verification",
    otp,
  );

module.exports = {
  sendOtp,
  sendOtpForLogin,
  sendOtpForCreateUser,
};
