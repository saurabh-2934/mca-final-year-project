import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";

export default function OtpVerification({ email, resend, path, msg }) {
  const { login } = useContext(AuthContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const inputs = useRef([]);

  // 4 minutes = 240 seconds
  const [timeLeft, setTimeLeft] = useState(240);

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resendOtp = () => {
    setTimeLeft(240);
    resend();
  };
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputs.current[lastIndex].focus();
  };

  const verifyOTP = async () => {
    try {
      const finalOTP = otp.join("");

      const response = await axiosInstance.post(
        `/user/${path}`,
        {
          email,
          otp: finalOTP,
        },
        { withCredentials: true },
      );
      setError(false);
      const accessToken = response.data?.accessToken;
      const userData = response.data?.user;
      login(userData, accessToken);
      //Save access token
      navigate("/");
    } catch (err) {
      setError(true);
      setErrMsg(err.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 ">
      <div className="w-full flex justify-between items-center">
        <p className="text-xs font-semibold">Enter OTP</p>
        <p
          className={`font-medium ${
            timeLeft <= 60 ? "text-red-500" : "text-gray-600"
          }`}>
          {timeLeft > 0 ? (
            `OTP expires in ${formatTime()}`
          ) : (
            <button onClick={resendOtp} className="text-md text-blue-500">
              Resend Otp
            </button>
          )}
        </p>
      </div>
      <div className="flex gap-3" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-9 h-10 md:w-12 md:h-12 text-center text-md md:text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <button
        onClick={verifyOTP}
        disabled={timeLeft === 0}
        className="bg-orange-600 rounded-sm w-full p-4 text-white font-semibold shadow-xl">
        {`Verify Otp & ${msg}`}
      </button>
      {error && (
        <p className="text-red-500 font-semibold text-md text-left">{errMsg}</p>
      )}
    </div>
  );
}
