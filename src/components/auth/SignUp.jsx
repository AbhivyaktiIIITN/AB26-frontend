import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { signIn, signUp, useSession } from "../../lib/auth-client";
import { sendOTP, verifyOTP } from "../../lib/otp-client";

const OTP_LENGTH = 6;

// Helper function to convert technical errors to user-friendly messages
const getErrorMessage = (error) => {
  const errorStr = error?.message?.toLowerCase() || "";

  if (errorStr.includes("email"))
    return "This email is already registered. Please Sign-In.";
  if (errorStr.includes("password"))
    return "Password must be at least 8 characters";
  if (errorStr.includes("otp") || errorStr.includes("code"))
    return "Invalid code. Please try again";
  if (
    errorStr.includes("network") ||
    errorStr.includes("connect") ||
    errorStr.includes("failed to fetch")
  )
    return "Network error. Check your connection";
  if (errorStr.includes("cors"))
    return "Connection issue. Check your network and try again";
  if (errorStr.includes("json") || errorStr.includes("parse"))
    return "Something went wrong. Try again later";

  // For unknown errors, show generic user-friendly message
  return "Something went wrong. Please try again later";
};

const SignUp = ({ onSwitchToSignIn, onClose }) => {
  const { showToast } = useToast();
  const { data: session, isLoading: sessionLoading } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    collegeName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("signupFormData");
    const savedEmail = localStorage.getItem("signupUserEmail");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }

    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const saveFormData = () => {
    try {
      localStorage.setItem("signupFormData", JSON.stringify(formData));
      localStorage.setItem("signupUserEmail", userEmail);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const clearSavedData = () => {
    localStorage.removeItem("signupFormData");
    localStorage.removeItem("signupUserEmail");
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // auto-focus otp
  useEffect(() => {
    if (currentStep === 3) {
      inputRefs.current[0]?.focus();
    }
  }, [currentStep]);

  const handleChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedFormData);

    try {
      localStorage.setItem("signupFormData", JSON.stringify(updatedFormData));
    } catch (error) {
      console.error("Error auto-saving form data:", error);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          showToast("First name is required", "error");
          return false;
        }
        if (!formData.lastName.trim()) {
          showToast("Last name is required", "error");
          return false;
        }
        if (!formData.dateOfBirth) {
          showToast("Date of birth is required", "error");
          return false;
        }
        return true;
      case 2:
        if (!formData.collegeName.trim()) {
          showToast("College name is required", "error");
          return false;
        }
        if (!formData.phoneNumber.trim()) {
          showToast("Phone number is required", "error");
          return false;
        }
        if (!formData.email.trim()) {
          showToast("Email is required", "error");
          return false;
        }
        return true;
      case 3:
        const code = otp.join("");
        if (code.length !== OTP_LENGTH) {
          showToast("Please enter the full OTP", "error");
          return false;
        }
        return true;
      case 4:
        if (!formData.password.trim()) {
          showToast("Password is required", "error");
          return false;
        }
        if (formData.password.length < 8) {
          showToast("Password must be at least 8 characters long", "error");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          showToast("Passwords do not match", "error");
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const verifyOTPCode = async (otpArray = null) => {
    if (isLoading) return;

    const codeArray = otpArray || otp;
    const code = codeArray.join("");
    if (code.length !== OTP_LENGTH) {
      showToast("Please enter the full OTP", "error");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(userEmail, code);
      showToast("Email verified successfully!", "success");
      saveFormData();
      nextStep();
    } catch (err) {
      console.error("OTP verification error:", err);
      showToast(getErrorMessage(err), "error");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // auto-verify on 6th digit
    if (value && newOtp.every((digit) => digit !== "")) {
      setTimeout(() => {
        verifyOTPCode(newOtp);
      }, 100);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
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

    const nextEmpty = newOtp.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty]?.focus();
  };

  const handleResendOTP = async () => {
    if (!userEmail) {
      showToast("Email address not available for resend", "error");
      return;
    }

    setIsResending(true);
    try {
      await sendOTP(userEmail);
      showToast("Verification code sent to your email", "success");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend OTP error:", err);
      showToast(getErrorMessage(err), "error");
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    if (currentStep < 2) {
      saveFormData();
      nextStep();
    } else if (currentStep === 2) {
      setUserEmail(formData.email);
      saveFormData();

      setIsLoading(true);
      try {
        await sendOTP(formData.email);
        showToast("Verification code sent to your email", "success");
        nextStep();
      } catch (err) {
        console.error("Send verification error:", err);
        showToast(getErrorMessage(err), "error");
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 3) {
      await verifyOTPCode();
    } else if (currentStep === 4) {
      setIsLoading(true);
      saveFormData();

      await signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailVerified: true,
          collegeName: formData.collegeName,
          phoneNumber: formData.phoneNumber,
          authProvider: "local",
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: (ctx) => {
            setIsLoading(false);
            clearSavedData();
            showToast("Account created successfully!", "success");
            onClose();
          },
          onError: (ctx) => {
            setIsLoading(false);
            clearSavedData();
            console.error("SignUp error:", ctx.error);
            showToast(getErrorMessage(ctx.error), "error");
          },
        },
      );
    }
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    try {
      const currentOrigin =
        window.location.origin || import.meta.env.VITE_FRONTEND_URL;

      await signIn.social({
        provider: "google",
        callbackURL: `${currentOrigin}/`,
        redirectTo: currentOrigin,
      });
    } catch (error) {
      setIsGoogleLoading(false);
      console.error("Google signup error:", error);
      showToast(getErrorMessage(error), "error");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name (Optional)"
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
              <div className="relative w-full">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onClick={(e) => e.target.showPicker?.()}
                  required
                  className={`w-full p-3 sm:p-4 border-2 border-gray-600 rounded-none bg-transparent
                  text-sm sm:text-base transition-all duration-200 cursor-pointer
                  focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951]
                  z-10 relative
                  ${!formData.dateOfBirth ? "text-transparent" : "text-gray-900"} 
                `}
                />

                {/* fake placeholder */}
                {!formData.dateOfBirth && (
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base pointer-events-none z-0">
                    Date of Birth
                  </span>
                )}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="College Name"
                required
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                pattern="[0-9]{10}"
                onChange={handleChange}
                placeholder="Phone Number (10 Digits)"
                maxLength={10}
                required
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
            />
          </>
        );
      case 3:
        // OTP Verification Step
        const isOtpComplete = otp.every((d) => d !== "");

        return (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-600 text-base mb-4">
                We've sent a 6‑digit code to{" "}
                <span className="font-semibold text-gray-800">{userEmail}</span>
                . Enter it below.
                <br />
                <span className="text-sm text-gray-400 mt-2 block">Please check your spam or junk folder as well.</span>
              </p>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-md transition-all duration-200 focus:outline-none ${digit
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-gray-600 focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951]"
                    }`}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-red-600 font-bold hover:text-red-800 hover:underline transition-colors bg-transparent border-none cursor-pointer disabled:opacity-50"
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              </p>
            </div>
          </>
        );
      case 4:
        // Password Creation Step
        return (
          <>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Password"
              required
              className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row tracking-wide">
      {/* Left side - Brand/Image */}
      <div className="hidden md:flex md:w-1/2 items-start justify-start p-6 text-white text-center relative bg-gray-900 rounded-l-lg">
        <span className="text-xl font-semibold z-10 relative select-none">
          Abhivyakti'26
        </span>
        <img
          className="absolute inset-0 select-none w-full h-full object-cover opacity-80 rounded-l-lg"
          src="/registerimg.jpg"
          alt="Login"
        />
      </div>

      {/* Right side - Form content */}
      <div className="w-full md:w-1/2 flex flex-col bg-white rounded-r-lg relative">
        <div className="flex items-center justify-center pt-14 p-6 flex-1">
          <div className="w-full">
            {/* back button */}
            {currentStep > 1 && (
              <motion.button
                initial={{ opacity: 0, x: 10 }} // Starts slightly to the left and invisible
                animate={{ opacity: 1, x: 0 }} // Slides in and fades on
                exit={{ opacity: 0, x: 10 }} // Slides out when going back to Step 1
                transition={{ duration: 0.2 }}
                onClick={prevStep}
                className="absolute top-6 left-6 cursor-pointer text-gray-500 hover:text-[#3C0919] flex items-center gap-1 transition-colors text-sm font-medium z-20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </motion.button>
            )}

            <div className="mb-3 sm:mb-5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Create Your Account
              </h2>
              <p className="text-gray-500 text-sm sm:text-lg font-medium">
                Join Abhivyakti'26 and register for events, updates, and
                participation.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.25 bg-gray-200 rounded-lg my-6">
              <div
                className="h-full bg-linear-to-r from-pink-500 to-red-600 transition-all duration-300 rounded-lg"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            <form
              onSubmit={handleContinue}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex flex-col gap-4 sm:gap-6"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              <button
                type="submit"
                className="bg-[#3C0919] border-2 text-white border-none p-2 sm:p-3 text-lg sm:text-xl font-medium cursor-pointer transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#5a0d29] hover:transform hover:shadow-lg"
                disabled={isLoading || sessionLoading}
              >
                {isLoading
                  ? "Processing..."
                  : currentStep === 2
                    ? "Send Verification"
                    : currentStep === 3
                      ? "Verify Email"
                      : currentStep === 4
                        ? "Create Account"
                        : "Continue"}
              </button>

              <button
                onClick={handleGoogleSignUp}
                type="button"
                className="p-2 sm:p-3 border-2 -mt-2 md:-mt-3 border-gray-600 text-lg sm:text-xl font-medium cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#3c09191e]"
                disabled={isLoading || isGoogleLoading || currentStep > 2}
              >
                {isGoogleLoading ? "Processing..." : "Continue with Google"}
              </button>
            </form>

            <div className="mt-4 pt-6 border-gray-200">
              {currentStep < 3 && (
                <p className="text-gray-500 text-sm sm:text-md">
                  Already have an account?{" "}
                  <button
                    onClick={onSwitchToSignIn}
                    className="text-red-600 font-bold hover:text-red-800 hover:underline transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
