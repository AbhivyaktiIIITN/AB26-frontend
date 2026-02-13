import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { signIn } from "../../lib/auth-client";

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
    setIsLoading(true);

    await signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          showToast("Login Successful", "success");
          onClose();
        },
        onError: (ctx) => {
          setIsLoading(false);
          showToast(ctx.error.message || "Invalid credentials", "error");
        },
      },
    );
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    try {
      // Use environment variable in production, fallback to current origin
      const frontendUrl =
        import.meta.env.VITE_FRONTEND_URL || window.location.origin;

      await signIn.social({
        provider: "google",
        callbackURL: `${frontendUrl}`,
        redirectTo: frontendUrl,
      });
    } catch (err) {
      setIsGoogleLoading(false);
      console.error("Google login error:", err);
      showToast("Google login failed. Please try again.", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-162.5 tracking-wide">
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

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white rounded-r-lg">
        <div className="w-full">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 ">
              LOGIN
            </h2>
            <p className="text-gray-500 text-md sm:text-lg font-medium ">
              Sign in to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="p-3 sm:p-4 border-2 border-gray-600 text-sm sm:text-base transition-all duration-200 focus:outline-none focus:border-[#3C0919] focus:ring-2 focus:ring-[#3c091951] placeholder-gray-400"
              />
            </div>

            <div className="flex justify-end items-center max-sm:-mt-2 text-sm">
              <button
                type="button" // Changed to type="button" to prevent form submit
                onClick={onSwitchToForgotPassword}
                className="text-red-600 no-underline font-medium hover:text-red-800 transition-colors bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="bg-[#3C0919] border-2 tracking-wider text-white border-none p-2 sm:p-3 text-lg sm:text-xl cursor-pointer transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#5a0d29] hover:transform hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Continue"}
            </button>
            <button
              onClick={handleGoogleSubmit}
              type="button"
              className="p-2 sm:p-3 border-2 -mt-2 md:-mt-3 tracking-wider border-gray-600 text-lg sm:text-xl font-medium cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#3c09191e]"
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? "Signing In..." : "Continue with Google"}
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
