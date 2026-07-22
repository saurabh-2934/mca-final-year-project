const brevo = require("@getbrevo/brevo");
require("dotenv").config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const sendMail = async (to, subject, heading, otp) => {
  try {
    const email = {
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

          <p>This OTP is valid for <b>10 minutes</b>.</p>

          <p>If you didn't request this OTP, please ignore this email.</p>

          <br/>

          <p>Thanks,</p>
          <h3>QuickCart Team</h3>
        </div>
      `,
    };

    const response = await apiInstance.sendTransacEmail(email);

    console.log("✅ Email Sent");
    console.log(response.body);

    return response.body;
  } catch (err) {
    console.error("❌ Brevo Error");

    if (err.response) {
      console.error(err.response.body);
    } else {
      console.error(err);
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
