const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Password Reset</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
};

const sendOtpForLogin = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login OTP",
    html: `
      <h2>Login OTP</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
};
const sendOtpForCreateUser = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "New User Registration OTP",
    html: `
      <h2>Registration OTP</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  });
};

module.exports = { sendOtp, sendOtpForLogin, sendOtpForCreateUser };
