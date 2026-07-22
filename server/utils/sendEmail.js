const axios = require("axios");
require("dotenv").config();

const sendMail = async (to, subject, heading, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "QuickCart",
          email: process.env.EMAIL_USER,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,

        htmlContent: `
          <div style="font-family:Arial,sans-serif;padding:20px">
            <h2>${heading}</h2>

            <p>Your OTP is:</p>

            <h1 style="color:#2563eb;letter-spacing:5px">
              ${otp}
            </h1>

            <p>This OTP is valid for <strong>10 minutes</strong>.</p>

            <p>If you didn't request this OTP, ignore this email.</p>

            <br>

            <p>QuickCart Team</p>
          </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      },
    );

    console.log("✅ Email Sent");
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.error("❌ Brevo Error");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    throw err;
  }
};

const sendOtp = (email, otp) =>
  sendMail(email, "Password Reset OTP", "Password Reset", otp);

const sendOtpForLogin = (email, otp) =>
  sendMail(email, "Login OTP", "Login Verification", otp);

const sendOtpForCreateUser = (email, otp) =>
  sendMail(email, "Registration OTP", "Registration Verification", otp);

module.exports = {
  sendOtp,
  sendOtpForLogin,
  sendOtpForCreateUser,
};
