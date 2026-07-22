const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");
require("dotenv").config();

// Check Brevo credentials
if (!process.env.BREVO_USER || !process.env.BREVO_PASS) {
  throw new Error(
    "BREVO_USER or BREVO_PASS is missing in environment variables.",
  );
}

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// Common function to send mail
const sendMail = async (to, subject, heading, otp) => {
  try {
    console.log("======================================");
    console.log("Sending Email...");
    console.log("To:", to);
    console.log("SMTP Login:", process.env.BREVO_USER);
    console.log("======================================");

    const info = await transporter.sendMail({
      from: '"QuickCart" <quickcart.ecommerce.off@gmail.com>',
      to,
      subject,
      html: `
        <div style="max-width:600px;margin:auto;padding:20px;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:10px;">
          <h2 style="color:#2563eb;">${heading}</h2>

          <p>Hello,</p>

          <p>Your One-Time Password (OTP) is:</p>

          <h1 style="
              background:#2563eb;
              color:#fff;
              display:inline-block;
              padding:12px 24px;
              border-radius:8px;
              letter-spacing:6px;
          ">
            ${otp}
          </h1>

          <p style="margin-top:20px;">
            This OTP is valid for <strong>10 minutes</strong>.
          </p>

          <p>
            If you did not request this OTP, please ignore this email.
          </p>

          <hr>

          <p style="color:#777;font-size:13px;">
            Thanks,<br>
            <strong>QuickCart Team</strong>
          </p>
        </div>
      `,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Sending Failed");
    console.error(error);
    throw error;
  }
};

// Password Reset OTP
const sendOtp = async (email, otp) => {
  return sendMail(email, "Password Reset OTP", "Password Reset", otp);
};

// Login OTP
const sendOtpForLogin = async (email, otp) => {
  return sendMail(email, "Login OTP", "Login Verification", otp);
};

// Registration OTP
const sendOtpForCreateUser = async (email, otp) => {
  return sendMail(email, "Registration OTP", "Registration Verification", otp);
};

module.exports = {
  sendOtp,
  sendOtpForLogin,
  sendOtpForCreateUser,
};
