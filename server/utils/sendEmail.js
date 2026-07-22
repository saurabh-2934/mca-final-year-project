const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for port 587
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

const sendMail = async (to, subject, heading, otp) => {
  try {
    await transporter.sendMail({
      from: `"QuickCart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2>${heading}</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px;">${otp}</h1>
          <p>This OTP is valid for <strong>10 minutes</strong>.</p>
          <p>If you did not request this OTP, you can safely ignore this email.</p>
        </div>
      `,
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

const sendOtp = async (email, otp) => {
  await sendMail(email, "Password Reset OTP", "Password Reset", otp);
};

const sendOtpForLogin = async (email, otp) => {
  await sendMail(email, "Login OTP", "Login Verification", otp);
};

const sendOtpForCreateUser = async (email, otp) => {
  await sendMail(
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
