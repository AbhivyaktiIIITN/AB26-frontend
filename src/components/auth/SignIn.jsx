import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { signIn } from "../../lib/auth-client";

// Helper function to convert technical errors to user-friendly messages
const getErrorMessage = (error) => {
  const errorStr = error?.message?.toLowerCase() || "";

  if (errorStr.includes("credentials") || errorStr.includes("invalid"))
    return "Email or password is incorrect";
  if (errorStr.includes("user") || errorStr.includes("not found"))
    return "Account not found. Please sign up";
  if (errorStr.includes("email")) return "Please check your email";
  if (
    errorStr.includes("network") ||
    errorStr.includes("connect") ||
    errorStr.includes("failed to fetch")
  )
    return "Network error. Check your connection";
  if (errorStr.includes("cors"))
    return "Connection issue. Check your network and try again";
  if (errorStr.includes("json") || errorStr.includes("parse"))
    return "Server connection issue. Please try again";

  return "Can't login at this moment. Try again later";
};

const SignIn = ({ onSwitchToSignUp, onSwitchToForgotPassword, onClose }) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showToast("The fest has concluded. Logins are no longer active.", "info");

    /* Original Login Logic for reference
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (response.error) {
        showToast(getErrorMessage(response.error), "error");
      } else {
        showToast("Welcome back!", "success");
        onClose();
      }
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setIsLoading(false);
    }
    */
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    showToast("The fest has concluded. Logins are no longer active.", "info");

    /* Original Google Login Logic for reference
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

      <div className="w-full md:w-1/2 flex items-center justify-center pt-8 p-6 bg-white rounded-r-lg">
        <div className="w-full">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 ">
              Fest Concluded
            </h2>
            <p className="text-gray-500 text-sm sm:text-lg font-medium mt-2">
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
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6 opacity-60 pointer-events-none"
          >
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                placeholder="Your Email"
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled
                placeholder="Password"
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="bg-[#3C0919] border-2 tracking-wider text-white border-none p-2 sm:p-3 text-lg sm:text-xl cursor-not-allowed mt-2"
              disabled
            >
              Sign In
            </button>
            <button
              onClick={handleGoogleSubmit}
              type="button"
              className="p-2 sm:p-3 border-2 -mt-2 md:-mt-3 tracking-wider border-gray-600 text-lg sm:text-xl font-medium cursor-not-allowed"
              disabled
            >
              Google Login
            </button>
          </form>

          <div className="mt-4 pt-6 border-gray-200">
            <p className="text-gray-500 text-sm sm:text-md">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignUp}
                className="text-red-600 no-underline font-bold hover:text-red-800 hover:underline transition-colors bg-transparent border-none cursor-pointer"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
