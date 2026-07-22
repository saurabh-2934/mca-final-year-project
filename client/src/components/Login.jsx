import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../utils/axiosInstance";
import OtpVerification from "./OtpVerification";

function Login() {
  const [email, setEmail] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/user/send-otp-login",
        {
          email,
        },
        { withCredentials: true },
      );

      setError(false);
      setOtpSend(response?.data?.success);
      toast.success("OTP sent successfully!", {
        style: {
          background: "transparent",
          color: "#16a34a",
          boxShadow: "none",
          border: "none",
        },
        iconTheme: {
          primary: "#16a34a",
          secondary: "#fff",
        },
      });
    } catch (err) {
      setErrMsg(err.response?.data?.message);
      console.log(err.response?.data);
      setError(true);
      setOtpSend(err.response?.data?.success);
    } finally {
      setLoading(false);
    }
  };

  const enterEmail = (e) => {
    setEmail(e.target.value);
  };

  const resend = () => {
    console.log("Otp Sent");
    sendVerificationCode();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row w-3/4 md:w-1/2 max-h-[500] rounded-md shadow-2xl">
        <div className="flex flex-col justify-between w-full md:w-1/3 rounded-t-md md:rounded-l-md md:rounded-tr-none bg-blue-500 p-4">
          <div className="text-left p-4">
            <h1 className="text-4xl text-white mb-4">Login</h1>
            <p className="text-xl text-white">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <img
            src="/login_logo.png"
            alt="login_logo"
            className="w-full hidden md:block"
          />
        </div>
        <div className=" w-full md:w-2/3 pl-4 pr-4 flex flex-col">
          <div className="relative pl-4 pr-4 pt-8 mb-10 w-full">
            <input
              id="email"
              type="email"
              placeholder=" "
              onChange={enterEmail}
              className="peer w-full border-b border-gray-400 px-2 pt-6 pb-1 outline-none focus:border-blue-600"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-14 bg-white px-1 text-base text-gray-400 font-semibold transition-all duration-200
              peer-focus:top-8
              peer-focus:text-md
              peer-[:not(:placeholder-shown)]:top-8
              peer-[:not(:placeholder-shown)]:text-md">
              Enter Email
            </label>
          </div>
          {otpSend && (
            <OtpVerification
              email={email}
              resend={resend}
              path="login"
              msg="Login"
            />
          )}
          {!otpSend && (
            <p className="text-sm text-gray-500 mb-3">
              By continuing, you agree to Flipkart's{" "}
              <span className="text-blue-600">Terms of Use</span> and{" "}
              <span className="text-blue-600">Privacy Policy</span>
            </p>
          )}
          {!otpSend && (
            <button
              disabled={!isValidEmail || loading}
              onClick={sendVerificationCode}
              className={`bg-orange-600 rounded-sm w-full p-4 text-white font-semibold shadow-xl${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-700 hover:bg-orange-800"
              }`}>
              {loading ? "Sending OTP..." : "Request for OTP"}
            </button>
          )}
          {error && (
            <p className="text-red-500 font-semibold text-md text-left">
              {errMsg}
            </p>
          )}
          <p className="mt-auto text-blue-600 text-sm font-semibold py-4 md:mt-64">
            <Link to="/account-create">New to Flipkart? Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
