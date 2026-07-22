const brevo = require("@getbrevo/brevo");
require("dotenv").config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const sendMail = async (to, subject, heading, otp) => {
  try {
    console.log("==================================");
    console.log("Sending Email...");
    console.log("To:", to);
    console.log("==================================");

    const email = new brevo.SendSmtpEmail();

    email.sender = {
      name: "QuickCart",
      email: process.env.EMAIL_USER,
    };

    email.to = [
      {
        email: to,
      },
    ];

    email.subject = subject;

    email.htmlContent = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>${heading}</h2>

        <p>Your OTP is</p>

        <h1 style="letter-spacing:6px;color:#2563eb">
          ${otp}
        </h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>

        <p>If you didn't request this OTP, please ignore this email.</p>

        <br>

        <p>Thanks,</p>
        <h3>QuickCart Team</h3>
      </div>
    `;

    const response = await apiInstance.sendTransacEmail(email);

    console.log("Email Sent Successfully");
    console.log(response);

    return response;
  } catch (err) {
    console.error("Brevo Error");

    if (err.response) {
      console.error(err.response.body);
    } else {
      console.error(err);
    }

    throw err;
  }
};

const sendOtp = async (email, otp) => {
  return await sendMail(email, "Password Reset OTP", "Password Reset", otp);
};

const sendOtpForLogin = async (email, otp) => {
  return await sendMail(email, "Login OTP", "Login Verification", otp);
};

const sendOtpForCreateUser = async (email, otp) => {
  return await sendMail(
    email,
    "Registration OTP",
    "Registration Verification",
    otp,
  );
};

module.exports = {
  sendOtp,
  sendOtpForLogin,
  sendOtpForCreateUser,
};
