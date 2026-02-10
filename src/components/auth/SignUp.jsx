import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { useAuthContext } from "../../contexts/AuthContext";
import useAuth from "../../hooks/auth/useAuth";

const SignUp = ({ onSwitchToSignIn, onSwitchToVerifyOTP, currentStep = 1 }) => {
  const { nextStep, prevStep } = useAuth();
  const { showToast } = useToast();
  const { register, googleLogin, isLoading: authLoading } = useAuthContext();
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          showToast("First name is required", "error");
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

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    if (currentStep < 3) {
      nextStep();
    } else {
      // Final submission
      setIsLoading(true);
      try {
        await register({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        showToast("Account created! Please verify your email.", "success");
        // Navigate to OTP verification
        if (onSwitchToVerifyOTP) onSwitchToVerifyOTP();
      } catch (err) {
        showToast(err.message || "Failed to create account. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    googleLogin();
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
                placeholder="Last Name (Optional)"
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
              <div className="relative w-full">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onClick={(e) => e.target.showPicker?.()}
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
    <div className="flex flex-col md:flex-row md:min-h-[650px] tracking-wide">
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
        <div className="flex items-center justify-center pt-16 p-6 flex-1">
          <div className="w-full">
            {/* back button */}
            {currentStep > 1 && (
              <motion.button
                initial={{ opacity: 0, x: 10 }} // Starts slightly to the left and invisible
                animate={{ opacity: 1, x: 0 }} // Slides in and fades on
                exit={{ opacity: 0, x: 10 }} // Slides out when going back to Step 1
                transition={{ duration: 0.2 }}
                onClick={prevStep}
                className="absolute top-6 left-6 text-gray-500 hover:text-[#3C0919] flex items-center gap-1 transition-colors text-sm font-medium z-20"
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
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
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
                style={{ width: `${(currentStep / 3) * 100}%` }}
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
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : currentStep === 3
                    ? "Create Account"
                    : "Continue"}
              </button>

              <button
                onClick={handleGoogleSignUp}
                type="button"
                className="p-2 sm:p-3 border-2 -mt-2 md:-mt-3 border-gray-600 text-lg sm:text-xl font-medium cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#3c09191e]"
                disabled={isLoading}
              >
                Continue with Google
              </button>
            </form>

            <div className="mt-4 pt-6 border-gray-200">
              <p className="text-gray-500 text-sm sm:text-md">
                Already have an account?{" "}
                <button
                  onClick={onSwitchToSignIn}
                  className="text-red-600 font-bold hover:text-red-800 hover:underline transition-colors bg-transparent border-none cursor-pointer"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
