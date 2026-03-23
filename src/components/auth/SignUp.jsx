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
    showToast("The fest has concluded. Registrations are no longer active.", "info");

    /* Original SignUp Logic for reference
    const isValid = validateStep();
    if (!isValid) return;

    if (currentStep === 2) {
      setIsLoading(true);
      try {
        await sendOTP(formData.email);
        setUserEmail(formData.email);
        showToast("Verification code sent to your email", "success");
        nextStep();
      } catch (err) {
        showToast(getErrorMessage(err), "error");
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 4) {
      setIsLoading(true);
      try {
        const response = await signUp.email({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          collegeName: formData.collegeName,
          dateOfBirth: formData.dateOfBirth,
        });

        if (response.error) {
          showToast(getErrorMessage(response.error), "error");
        } else {
          showToast("Account created successfully!", "success");
          clearSavedData();
          onSwitchToSignIn();
        }
      } catch (err) {
        showToast(getErrorMessage(err), "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      nextStep();
    }
    */
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    showToast("The fest has concluded. Registrations are no longer active.", "info");

    /* Original Google SignUp Logic for reference
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
      });
    } catch (error) {
      showToast("Could not connect to Google. Please try again.", "error");
    } finally {
      setIsGoogleLoading(false);
    }
    */
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
            <div className="mb-3 sm:mb-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Fest Concluded
              </h2>
              <p className="text-gray-500 text-sm sm:text-lg font-medium">
                Thank you for being part of Abhivyakti'26!
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6 text-amber-800 text-sm sm:text-base">
              <p className="font-medium text-center">
                The fest has concluded and registrations/logins are now closed.
                We hope to see you next year!
              </p>
            </div>
            <form
              onSubmit={handleContinue}
              className="flex flex-col gap-4 sm:gap-6 mt-8 opacity-60 pointer-events-none"
            >


              <button
                type="submit"
                className="bg-[#3C0919] border-2 tracking-wider text-white border-none p-2 sm:p-3 text-lg sm:text-xl cursor-not-allowed mt-2"
                disabled
              >
                Register
              </button>

              <button
                onClick={handleGoogleSignUp}
                type="button"
                className="p-2 sm:p-3 border-2 -mt-2 md:-mt-3 border-gray-600 text-lg sm:text-xl font-medium cursor-not-allowed"
                disabled
              >
                Google Registration
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
