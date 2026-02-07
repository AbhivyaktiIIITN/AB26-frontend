import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { ForgotPassword, SignIn, SignUp } from "./";

const ModalAuthLayout = () => {
  const { mode, step, isOpen, closeAuth, switchAuthMode } = useAuth();

  // escape key
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && closeAuth();
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeAuth]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed inset-0 z-50 overflow-auto bg-black/25 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeAuth}
        >
          <motion.div
            key={mode}
            initial={{ scale: 0.97, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="relative bg-white rounded-lg shadow-xl w-7xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <button
              onClick={closeAuth}
              className="absolute bg-white top-4 right-4 z-10 text-gray-400 hover:text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors rounded-full p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="w-full">
                {mode === "signin" && (
                  <SignIn
                    onSwitchToSignUp={() => switchAuthMode("signup")}
                    onSwitchToForgotPassword={() =>
                      switchAuthMode("forgot-password")
                    }
                    currentStep={step}
                  />
                )}
                {mode === "signup" && (
                  <SignUp
                    onSwitchToSignIn={() => switchAuthMode("signin")}
                    currentStep={step}
                  />
                )}
                {mode === "forgot-password" && (
                  <ForgotPassword
                    onSwitchToSignIn={() => switchAuthMode("signin")}
                    currentStep={step}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalAuthLayout;
