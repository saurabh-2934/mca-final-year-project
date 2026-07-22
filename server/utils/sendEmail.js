const nodemailer = require("nodemailer");
require("dotenv").config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error(
    "EMAIL_USER or EMAIL_PASS is missing. Check your environment variables.",
  );
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS on port 587
  requireTLS: true,
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
    console.log("Sending email to:", to);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

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

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

const sendOtp = async (email, otp) => {
  return sendMail(email, "Password Reset OTP", "Password Reset", otp);
};

const sendOtpForLogin = async (email, otp) => {
  return sendMail(email, "Login OTP", "Login Verification", otp);
};

const sendOtpForCreateUser = async (email, otp) => {
  return sendMail(
    email,
    "New User Registration OTP",
    "Registration Verification",
    otp,
  );
};

module.exports = {
  sendOtp,
  sendOtpForLogin,
  sendOtpForCreateUser,
};
