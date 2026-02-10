import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import useAuth from "../../hooks/auth/useAuth";

const OTP_LENGTH = 6;

const VerifyOTP = ({ onSwitchToSignIn }) => {
  const { showToast } = useToast();
  const { verifyEmail, isLoading: authLoading } = useAuthContext();
  const { closeAuth } = useAuth();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // auto-focus
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move back on empty backspace
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmpty = newOtp.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      showToast("Please enter the full OTP", "error");
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(code);
      showToast("Email verified successfully!", "success");
      closeAuth();
    } catch (err) {
      showToast(err.message || "Invalid OTP. Please try again.", "error");
      // Clear the OTP and refocus
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="flex flex-col md:flex-row md:min-h-162.5 tracking-wide">
      {/* Left side – Brand/Image */}
      <div className="hidden md:flex md:w-1/2 items-start justify-start p-6 text-white text-center relative bg-gray-900 rounded-l-lg">
        <span className="text-xl font-semibold z-10 relative select-none">
          Abhivyakti'26
        </span>
        <img
          className="absolute inset-0 select-none w-full h-full object-cover opacity-80 rounded-l-lg"
          src="/registerimg.jpg"
          alt="Verify"
        />
      </div>

      {/* Right side – OTP form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white rounded-r-lg">
        <div className="w-full max-w-md">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              VERIFY EMAIL
            </h2>
            <p className="text-gray-500 text-md sm:text-lg font-medium mt-1">
              We've sent a 6‑digit code to your email. Enter it below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  className="w-11 h-13 sm:w-13 sm:h-15 text-center text-2xl font-semibold border-2 border-gray-600 rounded-md transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-300"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <button
              type="submit"
              className="bg-[#3C0919] border-2 tracking-wider text-white border-none p-2 sm:p-3 text-lg sm:text-xl cursor-pointer transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#5a0d29] hover:shadow-lg"
              disabled={isLoading || authLoading || !isComplete}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <div className="mt-4 pt-6 border-gray-200">
            <p className="text-gray-500 text-sm sm:text-md">
              Didn't receive the code?{" "}
              <button
                onClick={() =>
                  showToast("OTP resent to your email.", "success")
                }
                className="text-red-600 no-underline font-bold hover:text-red-800 hover:underline transition-colors bg-transparent border-none cursor-pointer"
              >
                Resend OTP
              </button>
            </p>
            <p className="text-gray-500 text-sm sm:text-md mt-2">
              <button
                onClick={onSwitchToSignIn}
                className="text-red-600 no-underline font-bold hover:text-red-800 hover:underline transition-colors bg-transparent border-none cursor-pointer"
              >
                Back to Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
