import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";

// Helper function to convert technical errors to user-friendly messages
const getErrorMessage = (error) => {
  const errorStr = error?.message?.toLowerCase() || "";

  if (errorStr.includes("email") || errorStr.includes("user"))
    return "Email not found. Please check and try again";
  if (errorStr.includes("network") || errorStr.includes("connect"))
    return "Network error. Check your connection";
  if (errorStr.includes("json") || errorStr.includes("parse"))
    return "Can't process request. Try again later";
  if (errorStr.includes("timeout"))
    return "Request took too long. Please try again";

  return "Couldn't send reset link. Try again later";
};

const ForgotPassword = ({ onSwitchToSignIn, onClose }) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // simulate api (logic goes here)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showToast("Reset link sent to your email", "success");
      setEmail("");
    } catch (err) {
      console.error("Password reset error:", err);
      showToast(getErrorMessage(err), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-162.5 tracking-wide">
      {/* Left side - Brand/Image */}
      <div className="hidden md:flex md:w-1/2 items-start justify-start p-6 text-white text-center relative bg-gray-900 rounded-l-lg">
        <span className="text-xl font-semibold z-10 relative select-none">
          Abhivyakti'26
        </span>
        <img
          className="absolute inset-0 select-none w-full h-full object-cover opacity-80 rounded-l-lg"
          src="/loginimg.jpg"
          alt="Login"
        />
      </div>

      {/* Right side - Form content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white rounded-r-lg">
        <div className="w-full">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 ">
              FORGOT PASSWORD
            </h2>
            <p className="text-gray-500 text-base sm:text-md font-medium ">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="p-3 sm:p-4 border-2 border-gray-600  text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="bg-[#3C0919] text-white border-none p-2 sm:p-3  text-lg sm:text-xl font-medium cursor-pointer transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#5a0d29] hover:transform hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="mt-4 pt-6 border-gray-200">
            <p className="text-gray-500  text-sm sm:text-md">
              Remember your password? <br></br>
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

export default ForgotPassword;
